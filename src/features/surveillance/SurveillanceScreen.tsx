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
import { zones } from '@/data/demoData';
import {
  formatHectares,
  riskLabels,
} from '@/utils/format';

export function SurveillanceScreen() {
  return (
    <Screen>
      <PageHeader
        title="Zones de surveillance"
        subtitle="Forêts classées, mangroves et zones naturelles sous observation."
      />

      {zones.map((zone) => {
        const affectedRatio =
          zone.affectedAreaHectares / zone.totalAreaHectares;

        return (
          <Card key={zone.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.titleGroup}>
                <View style={styles.icon}>
                  <Ionicons name="shield-checkmark" size={23} color={colors.primary} />
                </View>
                <View style={styles.titleCopy}>
                  <Text style={styles.name}>{zone.name}</Text>
                  <Text style={styles.type}>{zone.type}</Text>
                </View>
              </View>
              <StatusBadge
                value={zone.riskLevel}
                label={`Risque ${riskLabels[zone.riskLevel]}`}
              />
            </View>

            <View style={styles.metrics}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Surface totale</Text>
                <Text style={styles.metricValue}>
                  {formatHectares(zone.totalAreaHectares)} ha
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Surface affectée</Text>
                <Text style={[styles.metricValue, styles.affectedValue]}>
                  {formatHectares(zone.affectedAreaHectares)} ha
                </Text>
              </View>
            </View>

            <ProgressBar
              color={zone.riskLevel === 'critical' ? colors.danger : colors.warning}
              value={Math.min(affectedRatio * 35, 1)}
            />

            {zone.activeIncidents > 0 ? (
              <View style={styles.incidentNotice}>
                <View style={styles.pulse} />
                <Text style={styles.incidentText}>
                  {zone.activeIncidents} incident
                  {zone.activeIncidents > 1 ? 's' : ''} actif
                  {zone.activeIncidents > 1 ? 's' : ''}
                </Text>
              </View>
            ) : null}
          </Card>
        );
      })}
    </Screen>
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
    gap: 3,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  type: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'capitalize',
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
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
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  affectedValue: {
    color: colors.danger,
  },
  incidentNotice: {
    alignItems: 'center',
    backgroundColor: '#FFF0DB',
    borderRadius: radius.sm,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  pulse: {
    backgroundColor: colors.warning,
    borderRadius: radius.pill,
    height: 9,
    width: 9,
  },
  incidentText: {
    color: '#9D5D16',
    fontSize: 12,
    fontWeight: '700',
  },
});
