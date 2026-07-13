import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import {
  Card,
  PageHeader,
  ProgressBar,
  Screen,
  StatusBadge,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { parcels } from '@/data/demoData';
import {
  formatHectares,
  formatShortDate,
  healthLabels,
} from '@/utils/format';

const healthColors = {
  good: colors.success,
  moderate: colors.warning,
  stressed: '#B95B16',
  critical: colors.danger,
} as const;

export function ParcelsScreen() {
  return (
    <Screen>
      <PageHeader
        title="Parcelles agricoles"
        subtitle="Suivi des cultures et indices de végétation."
      />

      {parcels.map((parcel) => (
        <Card key={parcel.id} style={styles.card}>
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <View style={styles.icon}>
                <Ionicons name="leaf" size={22} color={colors.primary} />
              </View>
              <View style={styles.titleCopy}>
                <Text style={styles.name}>{parcel.name}</Text>
                <Text style={styles.farm}>{parcel.farmName}</Text>
              </View>
            </View>
            <StatusBadge
              value={parcel.healthStatus}
              label={healthLabels[parcel.healthStatus]}
            />
          </View>

          <View style={styles.metrics}>
            <ParcelMetric label="Culture" value={parcel.culture} />
            <ParcelMetric
              label="Surface"
              value={`${formatHectares(parcel.areaHectares)} ha`}
            />
            <ParcelMetric
              label="Semis"
              value={formatShortDate(parcel.sowingDate)}
            />
          </View>

          <View style={styles.ndviHeader}>
            <Text style={styles.ndviLabel}>NDVI actuel</Text>
            <Text
              style={[
                styles.ndviValue,
                { color: healthColors[parcel.healthStatus] },
              ]}
            >
              {parcel.latestNdvi.toFixed(2)}
            </Text>
          </View>
          <ProgressBar
            color={healthColors[parcel.healthStatus]}
            value={parcel.latestNdvi}
          />
        </Card>
      ))}
    </Screen>
  );
}

function ParcelMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  titleGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  titleCopy: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  farm: {
    color: colors.textMuted,
    fontSize: 12,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  ndviHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ndviLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  ndviValue: {
    fontSize: 17,
    fontWeight: '900',
  },
});
