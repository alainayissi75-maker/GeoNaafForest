import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';
import { GeoMap } from './components/GeoMap';
import type { BaseMapType, OperationalMapLayer } from './mapTypes';

const baseMaps: {
  value: BaseMapType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: 'standard', label: 'Standard', icon: 'map-outline' },
  { value: 'satellite', label: 'Satellite', icon: 'planet-outline' },
  { value: 'hybrid', label: 'Hybride', icon: 'layers-outline' },
  { value: 'terrain', label: 'Terrain', icon: 'trail-sign-outline' },
];

const operationalLayers: {
  value: OperationalMapLayer;
  label: string;
  color: string;
}[] = [
  { value: 'forest', label: 'Forêts', color: colors.purple },
  { value: 'agriculture', label: 'Parcelles', color: colors.success },
  { value: 'incidents', label: 'Incidents', color: colors.danger },
  { value: 'drones', label: 'Drones', color: colors.info },
  { value: 'iot', label: 'IoT', color: colors.warning },
];

export function MapScreen() {
  const [baseMap, setBaseMap] = useState<BaseMapType>('hybrid');
  const [layers, setLayers] = useState<OperationalMapLayer[]>([
    'forest',
    'incidents',
  ]);

  function toggleLayer(layer: OperationalMapLayer) {
    setLayers((currentLayers) =>
      currentLayers.includes(layer)
        ? currentLayers.filter((item) => item !== layer)
        : [...currentLayers, layer],
    );
  }

  return (
    <View style={styles.container}>
      <GeoMap baseMap={baseMap} layers={layers} />

      <View style={styles.topPanel}>
        <View style={styles.titleRow}>
          <View style={styles.titleIcon}>
            <Ionicons name="layers" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.title}>Cartographie spatiale</Text>
            <Text style={styles.subtitle}>
              Côte d’Ivoire · données de démonstration
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.controls}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {baseMaps.map((item) => {
            const active = baseMap === item.value;
            return (
              <Pressable
                accessibilityRole="button"
                key={item.value}
                onPress={() => setBaseMap(item.value)}
                style={[
                  styles.baseMapButton,
                  active ? styles.baseMapButtonActive : undefined,
                ]}
              >
                <Ionicons
                  color={active ? colors.white : colors.textMuted}
                  name={item.icon}
                  size={15}
                />
                <Text
                  style={[
                    styles.baseMapText,
                    active ? styles.baseMapTextActive : undefined,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          contentContainerStyle={styles.controls}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {operationalLayers.map((item) => {
            const active = layers.includes(item.value);
            return (
              <Pressable
                accessibilityRole="button"
                key={item.value}
                onPress={() => toggleLayer(item.value)}
                style={[
                  styles.layerButton,
                  active
                    ? {
                        backgroundColor: `${item.color}18`,
                        borderColor: item.color,
                      }
                    : undefined,
                ]}
              >
                <View
                  style={[
                    styles.layerDot,
                    {
                      backgroundColor: active
                        ? item.color
                        : colors.textMuted,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.layerText,
                    active ? { color: item.color } : undefined,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.legend}>
        <View style={styles.liveStatus}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Surveillance active</Text>
        </View>
        <Text style={styles.legendText}>
          {layers.length} couche{layers.length > 1 ? 's' : ''} visible
          {layers.length > 1 ? 's' : ''}
        </Text>
      </View>
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
    gap: spacing.sm,
    left: spacing.md,
    maxWidth: 720,
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
  controls: {
    gap: spacing.xs,
  },
  baseMapButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  baseMapButtonActive: {
    backgroundColor: colors.primary,
  },
  baseMapText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  baseMapTextActive: {
    color: colors.white,
  },
  layerButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  layerDot: {
    borderRadius: radius.pill,
    height: 7,
    width: 7,
  },
  layerText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  legend: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    bottom: spacing.md,
    gap: spacing.xs,
    left: spacing.md,
    padding: 12,
    position: 'absolute',
  },
  liveStatus: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  liveDot: {
    backgroundColor: colors.success,
    borderRadius: radius.pill,
    height: 8,
    width: 8,
  },
  liveText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
