import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { colors, radius, spacing } from '@/constants/theme';
import { incidents, parcels, zones } from '@/data/demoData';
import {
  incidentStatusLabels,
  incidentTypeLabels,
} from '@/utils/format';

type MapLayer = 'agriculture' | 'environment';

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

export function MapScreen() {
  const [layer, setLayer] = useState<MapLayer>('environment');

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initialRegion}
        mapType="hybrid"
        showsCompass
        style={StyleSheet.absoluteFill}
      >
        {layer === 'agriculture'
          ? parcels.map((parcel) => (
              <Polygon
                key={parcel.id}
                coordinates={parcel.boundary}
                fillColor={`${parcelColors[parcel.healthStatus]}55`}
                strokeColor={parcelColors[parcel.healthStatus]}
                strokeWidth={2}
              />
            ))
          : zones.map((zone) => (
              <Polygon
                key={zone.id}
                coordinates={zone.boundary}
                fillColor={`${colors.purple}35`}
                strokeColor={colors.purple}
                strokeWidth={2}
              />
            ))}

        {layer === 'environment'
          ? incidents.map((incident) => (
              <Marker
                key={incident.id}
                coordinate={incident.coordinate}
                description={`${incidentTypeLabels[incident.type]} · ${
                  incidentStatusLabels[incident.status]
                }`}
                pinColor={
                  incident.type === 'wildfire'
                    ? colors.danger
                    : colors.warning
                }
                title={incident.title}
              />
            ))
          : null}
      </MapView>

      <View style={styles.topPanel}>
        <View style={styles.titleRow}>
          <View style={styles.titleIcon}>
            <Ionicons name="layers" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.title}>Cartographie spatiale</Text>
            <Text style={styles.subtitle}>Côte d’Ivoire · mode démonstration</Text>
          </View>
        </View>

        <View style={styles.segment}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setLayer('agriculture')}
            style={[
              styles.segmentButton,
              layer === 'agriculture' ? styles.segmentButtonActive : undefined,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                layer === 'agriculture'
                  ? styles.segmentTextActive
                  : undefined,
              ]}
            >
              Parcelles
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setLayer('environment')}
            style={[
              styles.segmentButton,
              layer === 'environment' ? styles.segmentButtonActive : undefined,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                layer === 'environment'
                  ? styles.segmentTextActive
                  : undefined,
              ]}
            >
              Forêts
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.legend}>
        {layer === 'agriculture' ? (
          <>
            <LegendItem color={colors.success} label="Bonne santé" />
            <LegendItem color={colors.warning} label="À surveiller" />
            <LegendItem color={colors.danger} label="Critique" />
          </>
        ) : (
          <>
            <LegendItem color={colors.purple} label="Zone surveillée" />
            <LegendItem color={colors.danger} label="Feu actif" />
            <LegendItem color={colors.warning} label="Déforestation" />
          </>
        )}
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  topPanel: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    left: spacing.md,
    padding: spacing.md,
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  titleIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  segment: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    flexDirection: 'row',
    padding: spacing.xs,
  },
  segmentButton: {
    alignItems: 'center',
    borderRadius: radius.sm,
    flex: 1,
    paddingVertical: 9,
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: colors.white,
  },
  legend: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    bottom: spacing.md,
    gap: spacing.sm,
    left: spacing.md,
    padding: 12,
    position: 'absolute',
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  legendDot: {
    borderRadius: radius.pill,
    height: 10,
    width: 10,
  },
  legendText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600',
  },
});
