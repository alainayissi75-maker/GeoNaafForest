import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import {
  Card,
  PageHeader,
  Screen,
  StatusBadge,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { alerts } from '@/data/demoData';
import {
  formatDateTime,
  severityLabels,
} from '@/utils/format';

export function AlertsScreen() {
  return (
    <Screen>
      <PageHeader
        title="Centre d’alertes"
        subtitle="Notifications issues de la surveillance satellitaire et terrain."
      />

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryValue}>{alerts.length}</Text>
          <Text style={styles.summaryLabel}>alertes non traitées</Text>
        </View>
        <Ionicons name="notifications" size={34} color={colors.warning} />
      </View>

      {alerts.map((alert) => (
        <Card
          key={alert.id}
          style={[
            styles.alertCard,
            alert.severity === 'critical' ? styles.criticalCard : undefined,
          ]}
        >
          <View style={styles.alertTop}>
            <View
              style={[
                styles.alertIcon,
                {
                  backgroundColor:
                    alert.severity === 'critical' ? '#FBE2E0' : '#FFF0DB',
                },
              ]}
            >
              <Ionicons
                name={alert.type === 'wildfire' ? 'flame' : 'warning'}
                size={24}
                color={
                  alert.severity === 'critical'
                    ? colors.danger
                    : colors.warning
                }
              />
            </View>
            <View style={styles.alertCopy}>
              <View style={styles.titleRow}>
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
          </View>

          <View style={styles.alertAction}>
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.alertActionText}>Marquer comme traitée</Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#C8E2D6',
    fontSize: 13,
  },
  alertCard: {
    gap: spacing.md,
  },
  criticalCard: {
    borderColor: '#E9B5B0',
  },
  alertTop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  alertCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  alertTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
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
  alertAction: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  alertActionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
