import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card, PageHeader, Screen } from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { farms } from '@/data/demoData';
import { formatHectares } from '@/utils/format';

export function FarmsScreen() {
  return (
    <Screen>
      <PageHeader
        title="Exploitations"
        subtitle="Inventaire des exploitations agricoles suivies."
      />

      {farms.map((farm) => (
        <Card key={farm.id} style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name="business" size={25} color={colors.primary} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.name}>{farm.name}</Text>
            <View style={styles.location}>
              <Ionicons
                name="location-outline"
                size={15}
                color={colors.textMuted}
              />
              <Text style={styles.locationText}>{farm.region}</Text>
            </View>
            <View style={styles.metrics}>
              <Metric label="Culture" value={farm.primaryCulture} />
              <Metric
                label="Surface"
                value={`${formatHectares(farm.totalAreaHectares)} ha`}
              />
              <Metric label="Parcelles" value={String(farm.parcelCount)} />
            </View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  location: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  locationText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  metric: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    flex: 1,
    padding: spacing.sm,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
});
