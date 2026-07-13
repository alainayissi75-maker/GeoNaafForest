import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import {
  Card,
  PageHeader,
  ProgressBar,
  Screen,
  SectionHeader,
  StatCard,
  StatusBadge,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import {
  auditEvents,
  documents,
  droneMissions,
  fieldTasks,
  interventions,
  notificationDeliveries,
  operationalSummary,
  sensors,
  teamMembers,
} from '@/data/platformData';
import { formatDateTime } from '@/utils/format';

export function OperationsScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  return (
    <Screen contentStyle={wide ? styles.wideContent : undefined}>
      <PageHeader
        title="Centre des opérations"
        subtitle="Missions, alertes, équipes terrain, drones, capteurs et traçabilité."
      />
      <View style={styles.demoBanner}>
        <Ionicons name="information-circle" size={18} color={colors.info} />
        <Text style={styles.demoText}>
          Scénario opérationnel de démonstration, sans envoi réel de notification.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          accent={colors.info}
          detail="de l’ouverture à la prise en charge"
          icon={<Ionicons name="timer" size={22} color={colors.info} />}
          label="Temps moyen alertes"
          value={`${operationalSummary.averageAlertResponseMinutes} min`}
        />
        <StatCard
          accent={colors.purple}
          detail="missions aériennes actives"
          icon={<Ionicons name="airplane" size={22} color={colors.purple} />}
          label="Drones en mission"
          value={String(operationalSummary.dronesInMission)}
        />
        <StatCard
          accent={colors.primary}
          detail="scènes satellite traitées"
          icon={<Ionicons name="images" size={22} color={colors.primary} />}
          label="Images analysées"
          value={operationalSummary.satelliteImagesAnalyzed.toLocaleString(
            'fr-FR',
          )}
        />
        <StatCard
          accent={colors.warning}
          detail="moyenne des acquisitions"
          icon={<Ionicons name="cloud" size={22} color={colors.warning} />}
          label="Couverture nuageuse"
          value={`${operationalSummary.averageCloudCoverage.toFixed(1)} %`}
        />
        <StatCard
          accent={colors.danger}
          detail="coupes, mines et braconnage"
          icon={<Ionicons name="warning" size={22} color={colors.danger} />}
          label="Activités illégales"
          value={String(operationalSummary.illegalActivities)}
        />
        <StatCard
          accent={colors.success}
          detail="équipes actuellement mobilisées"
          icon={<Ionicons name="people" size={22} color={colors.success} />}
          label="Interventions ouvertes"
          value={String(operationalSummary.openInterventions)}
        />
      </View>

      <View style={wide ? styles.twoColumns : undefined}>
        <View style={styles.column}>
          <SectionHeader title="Drones et plans de vol" />
          {droneMissions.map((mission) => (
            <Card key={mission.id} style={styles.missionCard}>
              <View style={styles.cardHeader}>
                <View style={styles.titleGroup}>
                  <View style={styles.droneIcon}>
                    <Ionicons
                      name="airplane"
                      size={22}
                      color={colors.purple}
                    />
                  </View>
                  <View style={styles.titleCopy}>
                    <Text style={styles.cardTitle}>{mission.drone}</Text>
                    <Text style={styles.cardSubtitle}>
                      {mission.id} · {mission.zone}
                    </Text>
                  </View>
                </View>
                <StatusBadge value="medium" label="En mission" />
              </View>
              <View style={styles.inlineMetrics}>
                <SmallMetric
                  label="Pilote"
                  value={mission.pilot}
                />
                <SmallMetric
                  label="Batterie"
                  value={`${mission.batteryLevel} %`}
                />
                <SmallMetric
                  label="Images"
                  value={String(mission.imagesCaptured)}
                />
              </View>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{mission.flightPlan}</Text>
                <Text style={styles.progressValue}>{mission.progress} %</Text>
              </View>
              <ProgressBar color={colors.purple} value={mission.progress / 100} />
            </Card>
          ))}
        </View>

        <View style={styles.column}>
          <SectionHeader title="Tâches terrain" />
          {fieldTasks.map((task) => (
            <Card key={task.id} style={styles.taskCard}>
              <View style={styles.taskIcon}>
                <Ionicons
                  name="checkbox-outline"
                  size={21}
                  color={colors.primary}
                />
              </View>
              <View style={styles.titleCopy}>
                <Text style={styles.cardTitle}>{task.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {task.assignee} · {task.zone}
                </Text>
                <Text style={styles.dueDate}>
                  Échéance {formatDateTime(task.dueAt)}
                </Text>
              </View>
              <StatusBadge
                label={task.priority}
                value={task.priority}
              />
            </Card>
          ))}

          <SectionHeader title="Suivi des interventions" />
          {interventions.map((intervention) => (
            <Card key={intervention.id} style={styles.interventionCard}>
              <View style={styles.titleCopy}>
                <Text style={styles.cardTitle}>{intervention.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {intervention.id} · {intervention.team}
                </Text>
              </View>
              <View style={styles.responseTime}>
                <Text style={styles.responseValue}>
                  {intervention.responseMinutes} min
                </Text>
                <Text style={styles.responseLabel}>temps de réponse</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <SectionHeader title="Notifications en temps réel" />
      <View style={styles.deliveryGrid}>
        {notificationDeliveries.map((delivery) => (
          <Card key={delivery.channel} style={styles.deliveryCard}>
            <Ionicons
              color={
                delivery.channel === 'SMS'
                  ? colors.info
                  : delivery.channel === 'Email'
                    ? colors.warning
                    : colors.primary
              }
              name={
                delivery.channel === 'SMS'
                  ? 'chatbubble'
                  : delivery.channel === 'Email'
                    ? 'mail'
                    : 'notifications'
              }
              size={24}
            />
            <Text style={styles.deliveryChannel}>{delivery.channel}</Text>
            <Text style={styles.deliveryValue}>{delivery.delivered}</Text>
            <Text style={styles.deliveryDetail}>
              envoyées {delivery.sent} · échecs {delivery.failed}
            </Text>
          </Card>
        ))}
      </View>

      <View style={wide ? styles.threeColumns : undefined}>
        <View style={styles.column}>
          <SectionHeader title="Capteurs IoT" />
          {sensors.map((sensor) => (
            <Card key={sensor.id} style={styles.compactCard}>
              <View style={styles.sensorIcon}>
                <Ionicons
                  name="radio"
                  size={20}
                  color={
                    sensor.status === 'warning'
                      ? colors.warning
                      : colors.success
                  }
                />
              </View>
              <View style={styles.titleCopy}>
                <Text style={styles.cardTitle}>{sensor.name}</Text>
                <Text style={styles.cardSubtitle}>
                  {sensor.zone} · batterie {sensor.batteryLevel} %
                </Text>
              </View>
              <Text style={styles.sensorValue}>
                {sensor.value} {sensor.unit}
              </Text>
            </Card>
          ))}
        </View>

        <View style={styles.column}>
          <SectionHeader title="Équipe multidisciplinaire" />
          {teamMembers.slice(0, 5).map((member) => (
            <Card key={member.id} style={styles.compactCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
              <View style={styles.titleCopy}>
                <Text style={styles.cardTitle}>{member.name}</Text>
                <Text style={styles.cardSubtitle}>{member.role}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.column}>
          <SectionHeader title="Documents récents" />
          {documents.map((document) => (
            <Card key={document.id} style={styles.compactCard}>
              <View style={styles.documentIcon}>
                <Ionicons
                  name={document.type === 'photo' ? 'image' : 'document-text'}
                  size={20}
                  color={colors.info}
                />
              </View>
              <View style={styles.titleCopy}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {document.name}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {document.owner} · {document.size}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <SectionHeader title="Journal d’audit" />
      <Card style={styles.auditCard}>
        {auditEvents.map((event) => (
          <View key={event.id} style={styles.auditRow}>
            <View style={styles.auditDot} />
            <View style={styles.titleCopy}>
              <Text style={styles.auditText}>
                <Text style={styles.auditActor}>{event.actor}</Text>{' '}
                {event.action}{' '}
                <Text style={styles.auditResource}>{event.resource}</Text>
              </Text>
              <Text style={styles.cardSubtitle}>
                {formatDateTime(event.occurredAt)}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.smallMetric}>
      <Text style={styles.smallLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.smallValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wideContent: {
    alignSelf: 'center',
    maxWidth: 1440,
    width: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
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
    fontSize: 11,
    fontWeight: '700',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  threeColumns: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  column: {
    flex: 1,
    gap: spacing.md,
  },
  missionCard: {
    gap: spacing.md,
  },
  cardHeader: {
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
  droneIcon: {
    alignItems: 'center',
    backgroundColor: '#EEE8F7',
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  titleCopy: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: colors.textMuted,
    fontSize: 10,
  },
  inlineMetrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  smallMetric: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    flex: 1,
    padding: spacing.sm,
  },
  smallLabel: {
    color: colors.textMuted,
    fontSize: 9,
    textTransform: 'uppercase',
  },
  smallValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 10,
  },
  progressValue: {
    color: colors.purple,
    fontSize: 11,
    fontWeight: '800',
  },
  taskCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  taskIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  dueDate: {
    color: colors.warning,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  interventionCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  responseTime: {
    alignItems: 'flex-end',
  },
  responseValue: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  responseLabel: {
    color: colors.textMuted,
    fontSize: 9,
  },
  deliveryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  deliveryCard: {
    flexBasis: '30%',
    flexGrow: 1,
    gap: spacing.xs,
    minWidth: 140,
  },
  deliveryChannel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  deliveryValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  deliveryDetail: {
    color: colors.textMuted,
    fontSize: 9,
  },
  compactCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  sensorIcon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  sensorValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  avatarText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  documentIcon: {
    alignItems: 'center',
    backgroundColor: '#E8F1FA',
    borderRadius: radius.sm,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  auditCard: {
    gap: spacing.md,
  },
  auditRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  auditDot: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 9,
    marginTop: 5,
    width: 9,
  },
  auditText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  auditActor: {
    color: colors.text,
    fontWeight: '800',
  },
  auditResource: {
    color: colors.primary,
    fontWeight: '800',
  },
});
