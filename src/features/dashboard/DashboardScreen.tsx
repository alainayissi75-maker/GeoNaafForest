import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import {
  Card,
  PageHeader,
  Screen,
  SectionHeader,
  StatCard,
  StatusBadge,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { alerts, farms, incidents, parcels, timeline, zones } from '@/data/demoData';
import {
  formatDateTime,
  formatHectares,
  severityLabels,
} from '@/utils/format';

const maxTimelineValue = Math.max(...timeline.map((point) => point.hectares));
const totalForestArea = zones.reduce(
  (sum, zone) => sum + zone.totalAreaHectares,
  0,
);
const affectedArea = zones.reduce(
  (sum, zone) => sum + zone.affectedAreaHectares,
  0,
);
const activeWildfires = incidents.filter(
  (incident) => incident.type === 'wildfire' && incident.status === 'active',
).length;

export function DashboardScreen() {
  return (
    <Screen>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue unifiée des massifs surveillés et opérations terrain."
      />

      <View style={styles.demoBanner}>
        <Ionicons name="information-circle" size={18} color={colors.info} />
        <Text style={styles.demoText}>
          Données de démonstration inspirées du projet source.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          label="Surface forestière"
          value={`${formatHectares(totalForestArea)} ha`}
          detail={`${zones.length} zones de surveillance`}
          accent={colors.primary}
          icon={<Ionicons name="leaf" size={22} color={colors.primary} />}
        />
        <StatCard
          label="Zone affectée"
          value={`${formatHectares(affectedArea)} ha`}
          detail={`${((affectedArea / totalForestArea) * 100).toFixed(2)} % du total`}
          accent={colors.warning}
          icon={<Ionicons name="trending-down" size={22} color={colors.warning} />}
        />
        <StatCard
          label="Feux actifs"
          value={String(activeWildfires)}
          detail="Intervention requise"
          accent={colors.danger}
          icon={<Ionicons name="flame" size={22} color={colors.danger} />}
        />
        <StatCard
          label="Exploitations"
          value={String(farms.length)}
          detail={`${parcels.length} parcelles suivies`}
          accent={colors.info}
          icon={<Ionicons name="business" size={22} color={colors.info} />}
        />
      </View>

      <SectionHeader
        title="Évolution de la déforestation"
        caption="Hectares détectés par mois"
      />
      <Card style={styles.chartCard}>
        <View style={styles.chart}>
          {timeline.map((point) => (
            <View key={point.label} style={styles.chartColumn}>
              <Text style={styles.chartValue}>{point.hectares}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${Math.max(
                        (point.hectares / maxTimelineValue) * 100,
                        12,
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{point.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader title="Alertes récentes" />
      {alerts.map((alert) => (
        <Card key={alert.id} style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Ionicons
              name={alert.type === 'wildfire' ? 'flame' : 'warning'}
              size={22}
              color={
                alert.severity === 'critical' ? colors.danger : colors.warning
              }
            />
          </View>
          <View style={styles.alertCopy}>
            <View style={styles.alertTitleRow}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <StatusBadge
                value={alert.severity}
                label={severityLabels[alert.severity]}
              />
            </View>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertDate}>
              {formatDateTime(alert.createdAt)}
            </Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  demoBanner: {
    alignItems: 'center',
    backgroundColor: '#E8F1FA',
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: 12,
  },
  demoText: {
    color: colors.info,
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chartCard: {
    height: 240,
  },
  chart: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  chartValue: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  barTrack: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bar: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    minHeight: 12,
    width: '66%',
  },
  chartLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: spacing.sm,
  },
  alertCard: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertIcon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  alertCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  alertTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  alertTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  alertMessage: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  alertDate: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
