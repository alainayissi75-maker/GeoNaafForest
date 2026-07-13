import { Ionicons } from '@expo/vector-icons';
import type {
  FeatureCollection,
  GeoJsonProperties,
  Polygon as GeoJsonPolygon,
} from 'geojson';
import type { StyleSpecification } from 'maplibre-gl';
import { StyleSheet, Text, View } from 'react-native';
import MapLibre, { Layer, Marker, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { colors, radius, spacing } from '@/constants/theme';
import { incidents, parcels, zones } from '@/data/demoData';
import { droneMissions, sensors } from '@/data/platformData';
import type { BaseMapType, GeoMapProps } from '../mapTypes';

const rasterSources = {
  standard: {
    attribution: '© OpenStreetMap contributors',
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
  },
  satellite: {
    attribution:
      'Tiles © Esri — Sources: Esri, Maxar, Earthstar Geographics',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ],
  },
  terrain: {
    attribution: '© OpenStreetMap contributors, SRTM | © OpenTopoMap',
    tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
  },
  labels: {
    attribution: 'Tiles © Esri',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    ],
  },
} as const;

export function GeoMap({ baseMap, layers }: GeoMapProps) {
  return (
    <MapLibre
      initialViewState={{
        latitude: 7.45,
        longitude: -5.45,
        zoom: 5.7,
      }}
      mapStyle={createMapStyle(baseMap)}
      reuseMaps
      style={{ height: '100%', width: '100%' }}
    >
      {layers.includes('forest') ? (
        <PolygonOverlay
          color={colors.purple}
          data={createPolygonCollection(
            zones.map((zone) => ({
              id: zone.id,
              boundary: zone.boundary,
              name: zone.name,
            })),
          )}
          id="forest-zones"
        />
      ) : null}

      {layers.includes('agriculture') ? (
        <PolygonOverlay
          color={colors.success}
          data={createPolygonCollection(
            parcels.map((parcel) => ({
              id: parcel.id,
              boundary: parcel.boundary,
              name: parcel.name,
            })),
          )}
          id="agricultural-parcels"
        />
      ) : null}

      {layers.includes('incidents')
        ? incidents.map((incident) => (
            <Marker
              anchor="bottom"
              key={incident.id}
              latitude={incident.coordinate.latitude}
              longitude={incident.coordinate.longitude}
            >
              <MapMarker
                color={
                  incident.type === 'wildfire'
                    ? colors.danger
                    : colors.warning
                }
                icon={incident.type === 'wildfire' ? 'flame' : 'warning'}
                label={incident.title}
              />
            </Marker>
          ))
        : null}

      {layers.includes('drones')
        ? droneMissions.map((mission) => {
            const zone = zones.find((item) => item.name === mission.zone);
            if (!zone) {
              return null;
            }
            return (
              <Marker
                anchor="bottom"
                key={mission.id}
                latitude={zone.coordinate.latitude}
                longitude={zone.coordinate.longitude}
              >
                <MapMarker
                  color={colors.info}
                  icon="airplane"
                  label={`${mission.id} · ${mission.drone}`}
                />
              </Marker>
            );
          })
        : null}

      {layers.includes('iot')
        ? sensors.map((sensor) => {
            const zone = zones.find((item) => item.name === sensor.zone);
            if (!zone) {
              return null;
            }
            return (
              <Marker
                anchor="bottom"
                key={sensor.id}
                latitude={zone.coordinate.latitude - 0.03}
                longitude={zone.coordinate.longitude + 0.03}
              >
                <MapMarker
                  color={
                    sensor.status === 'warning'
                      ? colors.warning
                      : colors.success
                  }
                  icon="radio"
                  label={`${sensor.name} · ${sensor.value} ${sensor.unit}`}
                />
              </Marker>
            );
          })
        : null}
    </MapLibre>
  );
}

function PolygonOverlay({
  color,
  data,
  id,
}: {
  color: string;
  data: FeatureCollection<GeoJsonPolygon>;
  id: string;
}) {
  return (
    <Source data={data} id={id} type="geojson">
      <Layer
        id={`${id}-fill`}
        paint={{ 'fill-color': color, 'fill-opacity': 0.22 }}
        type="fill"
      />
      <Layer
        id={`${id}-line`}
        paint={{ 'line-color': color, 'line-width': 2 }}
        type="line"
      />
    </Source>
  );
}

function MapMarker({
  color,
  icon,
  label,
}: {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.markerContainer}>
      <View style={[styles.marker, { backgroundColor: color }]}>
        <Ionicons color={colors.white} name={icon} size={16} />
      </View>
      <Text numberOfLines={1} style={styles.markerLabel}>
        {label}
      </Text>
    </View>
  );
}

function createPolygonCollection(
  entries: {
    id: number;
    name: string;
    boundary: { latitude: number; longitude: number }[];
  }[],
): FeatureCollection<GeoJsonPolygon, GeoJsonProperties> {
  return {
    type: 'FeatureCollection',
    features: entries.map((entry) => {
      const coordinates = entry.boundary.map((coordinate) => [
        coordinate.longitude,
        coordinate.latitude,
      ]);
      coordinates.push(coordinates[0]);

      return {
        type: 'Feature',
        id: entry.id,
        properties: { name: entry.name },
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      };
    }),
  };
}

function createMapStyle(baseMap: BaseMapType): StyleSpecification {
  const primary = baseMap === 'hybrid' ? rasterSources.satellite : rasterSources[baseMap];
  const hybrid = baseMap === 'hybrid';

  return {
    version: 8,
    sources: {
      primary: {
        type: 'raster',
        tiles: [...primary.tiles],
        tileSize: 256,
        attribution: primary.attribution,
      },
      ...(hybrid
        ? {
            labels: {
              type: 'raster' as const,
              tiles: [...rasterSources.labels.tiles],
              tileSize: 256,
              attribution: rasterSources.labels.attribution,
            },
          }
        : {}),
    },
    layers: [
      {
        id: 'primary',
        type: 'raster',
        source: 'primary',
        minzoom: 0,
        maxzoom: 19,
      },
      ...(hybrid
        ? [
            {
              id: 'labels',
              type: 'raster' as const,
              source: 'labels',
              minzoom: 0,
              maxzoom: 19,
            },
          ]
        : []),
    ],
  };
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    maxWidth: 160,
  },
  marker: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: 2,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  markerLabel: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: radius.sm,
    color: colors.text,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
    maxWidth: 150,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
});
