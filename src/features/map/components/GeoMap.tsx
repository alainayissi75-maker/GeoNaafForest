import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { incidents, parcels, zones } from '@/data/demoData';
import { droneMissions, sensors } from '@/data/platformData';
import type { BaseMapType, GeoMapProps } from '../mapTypes';

const initialRegion = {
  latitude: 7.45,
  longitude: -5.45,
  latitudeDelta: 6.3,
  longitudeDelta: 6.3,
};

const parcelColors = {
  good: colors.success,
  moderate: colors.warning,
  stressed: '#B95B16',
  critical: colors.danger,
} as const;

const nativeMapTypes: Record<
  BaseMapType,
  'standard' | 'satellite' | 'hybrid' | 'terrain'
> = {
  standard: 'standard',
  satellite: 'satellite',
  hybrid: 'hybrid',
  terrain: 'terrain',
};

export function GeoMap({ baseMap, layers }: GeoMapProps) {
  return (
    <MapView
      initialRegion={initialRegion}
      mapType={nativeMapTypes[baseMap]}
      showsCompass
      style={StyleSheet.absoluteFill}
    >
      {layers.includes('agriculture')
        ? parcels.map((parcel) => (
            <Polygon
              key={parcel.id}
              coordinates={parcel.boundary}
              fillColor={`${parcelColors[parcel.healthStatus]}55`}
              strokeColor={parcelColors[parcel.healthStatus]}
              strokeWidth={2}
            />
          ))
        : null}

      {layers.includes('forest')
        ? zones.map((zone) => (
            <Polygon
              key={zone.id}
              coordinates={zone.boundary}
              fillColor={`${colors.purple}35`}
              strokeColor={colors.purple}
              strokeWidth={2}
            />
          ))
        : null}

      {layers.includes('incidents')
        ? incidents.map((incident) => (
            <Marker
              key={incident.id}
              coordinate={incident.coordinate}
              description={`${incident.zoneName} · ${incident.areaHectares} ha`}
              pinColor={
                incident.type === 'wildfire' ? colors.danger : colors.warning
              }
              title={incident.title}
            />
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
                coordinate={zone.coordinate}
                description={`${mission.pilot} · batterie ${mission.batteryLevel} %`}
                key={mission.id}
                pinColor={colors.info}
                title={`${mission.drone} · ${mission.id}`}
              />
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
                coordinate={{
                  latitude: zone.coordinate.latitude - 0.03,
                  longitude: zone.coordinate.longitude + 0.03,
                }}
                description={`${sensor.value} ${sensor.unit} · batterie ${sensor.batteryLevel} %`}
                key={sensor.id}
                pinColor={
                  sensor.status === 'warning'
                    ? colors.warning
                    : colors.success
                }
                title={sensor.name}
              />
            );
          })
        : null}
    </MapView>
  );
}
