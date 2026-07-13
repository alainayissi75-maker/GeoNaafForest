import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  PageHeader,
  Screen,
  StatusBadge,
} from '@/components/ui';
import type { RootStackParamList } from '@/app/AppNavigator';
import { colors, radius, spacing } from '@/constants/theme';
import { incidents } from '@/data/demoData';
import {
  formatDateTime,
  formatHectares,
  incidentStatusLabels,
  incidentTypeLabels,
  severityLabels,
} from '@/utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Incidents'>;

export function IncidentsScreen({ navigation }: Props) {
  return (
    <Screen>
      <PageHeader
        title="Incidents"
        subtitle="Signalements de déforestation, feu et dégradation."
        action={
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ReportIncident')}
            style={styles.addButton}
          >
            <Ionicons name="add" size={20} color={colors.white} />
          </Pressable>
        }
      />

      {incidents.map((incident) => (
        <Card key={incident.id} style={styles.card}>
          <View style={styles.header}>
            <View
              style={[
                styles.icon,
                {
                  backgroundColor:
                    incident.type === 'wildfire' ? '#FBE2E0' : '#FFF0DB',
                },
              ]}
            >
              <Ionicons
                name={incident.type === 'wildfire' ? 'flame' : 'warning'}
                size={24}
                color={
                  incident.type === 'wildfire'
                    ? colors.danger
                    : colors.warning
                }
              />
            </View>
            <View style={styles.titleCopy}>
              <Text style={styles.type}>
                {incidentTypeLabels[incident.type]}
              </Text>
              <Text style={styles.title}>{incident.title}</Text>
            </View>
            <StatusBadge
              value={incident.severity}
              label={severityLabels[incident.severity]}
            />
          </View>

          <Text style={styles.description}>{incident.description}</Text>

          <View style={styles.infoGrid}>
            <Info label="Zone" value={incident.zoneName} />
            <Info
              label="Surface"
              value={`${formatHectares(incident.areaHectares)} ha`}
            />
            <Info
              label="Statut"
              value={incidentStatusLabels[incident.status]}
            />
            <Info
              label="Signalé"
              value={formatDateTime(incident.reportedAt)}
            />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  card: {
    gap: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  icon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  titleCopy: {
    flex: 1,
    gap: 2,
  },
  type: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  info: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    minWidth: '46%',
    padding: spacing.sm,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 9,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
});
