import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import {
  Card,
  PageHeader,
  ProgressBar,
  Screen,
  SectionHeader,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import {
  carbonSummary,
  deforestationCauses,
  speciesImpacts,
  vegetationIndices,
  vegetationSeries,
} from '@/data/platformData';

const maximumNdvi = Math.max(...vegetationSeries.map((point) => point.ndvi));

export function AnalyticsScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  return (
    <Screen contentStyle={wide ? styles.wideContent : undefined}>
      <PageHeader
        title="Intelligence forestière"
        subtitle="Indices de végétation, carbone, biomasse et dynamique du couvert."
      />
      <View style={styles.demoBanner}>
        <Ionicons name="information-circle" size={18} color={colors.info} />
        <Text style={styles.demoText}>
          Valeurs de démonstration en attente des connecteurs satellite.
        </Text>
      </View>

      <View style={styles.metricGrid}>
        <CarbonMetric
          accent={colors.primary}
          icon="leaf"
          label="Carbone stocké"
          value={`${formatCompact(carbonSummary.storedTons)} t`}
          wide={wide}
        />
        <CarbonMetric
          accent={colors.danger}
          icon="trending-down"
          label="Carbone perdu"
          value={`${formatCompact(carbonSummary.lostTons)} t`}
          wide={wide}
        />
        <CarbonMetric
          accent={colors.warning}
          icon="cloud"
          label="Émissions estimées"
          value={`${formatCompact(carbonSummary.estimatedEmissionsTons)} tCO₂e`}
          wide={wide}
        />
        <CarbonMetric
          accent={colors.info}
          icon="earth"
          label="Biomasse"
          value={`${formatCompact(carbonSummary.biomassTons)} t`}
          wide={wide}
        />
        <CarbonMetric
          accent={colors.success}
          icon="refresh-circle"
          label="Superficie restaurée"
          value={`${carbonSummary.restoredHectares.toFixed(1)} ha`}
          wide={wide}
        />
      </View>

      <View style={wide ? styles.twoColumns : undefined}>
        <View style={styles.column}>
          <SectionHeader
            title="Évolution mensuelle du NDVI"
            caption="Moyenne du couvert surveillé"
          />
          <Card style={styles.chartCard}>
            <View style={styles.chart}>
              {vegetationSeries.map((point) => (
                <View key={point.month} style={styles.chartColumn}>
                  <Text style={styles.chartValue}>{point.ndvi.toFixed(2)}</Text>
                  <View style={styles.chartTrack}>
                    <View
                      style={[
                        styles.chartBar,
                        { height: `${(point.ndvi / maximumNdvi) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.chartLabel}>{point.month}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.column}>
          <SectionHeader
            title="Causes de la déforestation"
            caption="Répartition des surfaces détectées"
          />
          <Card style={styles.causeCard}>
            {deforestationCauses.map((cause) => (
              <View key={cause.label} style={styles.causeRow}>
                <View style={styles.causeHeader}>
                  <Text style={styles.causeLabel}>{cause.label}</Text>
                  <Text style={styles.causeValue}>
                    {cause.percentage}% · {cause.hectares.toFixed(1)} ha
                  </Text>
                </View>
                <ProgressBar
                  color={
                    cause.percentage >= 25 ? colors.danger : colors.warning
                  }
                  value={cause.percentage / 100}
                />
              </View>
            ))}
          </Card>
        </View>
      </View>

      <SectionHeader
        title="Indices de télédétection"
        caption="Dernière synthèse multi-capteurs"
      />
      <View style={styles.indexGrid}>
        {vegetationIndices.map((index) => {
          const positive = index.trend >= 0;
          const improving =
            index.status === 'improving' ||
            (index.name !== 'Forest Loss' &&
              index.name !== 'Burn Severity' &&
              positive);

          return (
            <Card
              key={index.name}
              style={[
                styles.indexCard,
                { flexBasis: wide ? '23%' : '47%' },
              ]}
            >
              <Text style={styles.indexName}>{index.name}</Text>
              <Text style={styles.indexValue}>
                {index.value.toLocaleString('fr-FR')} {index.unit}
              </Text>
              <View style={styles.trendRow}>
                <Ionicons
                  color={improving ? colors.success : colors.danger}
                  name={positive ? 'arrow-up' : 'arrow-down'}
                  size={14}
                />
                <Text
                  style={[
                    styles.trendText,
                    {
                      color: improving ? colors.success : colors.danger,
                    },
                  ]}
                >
                  {Math.abs(index.trend).toFixed(1)} %
                </Text>
              </View>
            </Card>
          );
        })}
      </View>

      <SectionHeader
        title="Essences concernées"
        caption="Pertes estimées par essence prioritaire"
      />
      <View style={wide ? styles.speciesGrid : undefined}>
        {speciesImpacts.map((species) => (
          <Card
            key={species.name}
            style={wide ? styles.speciesCardWide : styles.speciesCard}
          >
            <View style={styles.speciesIcon}>
              <Ionicons name="leaf-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.speciesCopy}>
              <Text style={styles.speciesCommon}>{species.commonName}</Text>
              <Text style={styles.speciesScientific}>{species.name}</Text>
            </View>
            <View style={styles.speciesMeasure}>
              <Text style={styles.speciesValue}>
                {species.affectedHectares.toFixed(1)} ha
              </Text>
              <Text style={styles.speciesCarbon}>
                {formatCompact(species.carbonLossTons)} t carbone
              </Text>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function CarbonMetric({
  accent,
  icon,
  label,
  value,
  wide,
}: {
  accent: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  wide: boolean;
}) {
  return (
    <Card style={[styles.metricCard, { flexBasis: wide ? '18%' : '47%' }]}>
      <View style={[styles.metricIcon, { backgroundColor: `${accent}18` }]}>
        <Ionicons color={accent} name={icon} size={21} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );
}

function formatCompact(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
}

const styles = StyleSheet.create({
  wideContent: {
    alignSelf: 'center',
    maxWidth: 1440,
    width: '100%',
  },
  metricGrid: {
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
  metricCard: {
    flexGrow: 1,
    gap: spacing.xs,
    minWidth: 150,
  },
  metricIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.xs,
    width: 40,
  },
  metricValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  column: {
    flex: 1,
    gap: spacing.md,
  },
  chartCard: {
    height: 260,
  },
  chart: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
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
  },
  chartTrack: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: spacing.sm,
    width: '100%',
  },
  chartBar: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    minHeight: 16,
    width: '64%',
  },
  chartLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  causeCard: {
    gap: spacing.md,
    minHeight: 260,
  },
  causeRow: {
    gap: spacing.sm,
  },
  causeHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  causeLabel: {
    color: colors.text,
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
  },
  causeValue: {
    color: colors.textMuted,
    fontSize: 11,
  },
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  indexCard: {
    flexGrow: 1,
    gap: spacing.xs,
    minWidth: 145,
  },
  indexName: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  indexValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  trendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
  },
  speciesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  speciesCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  speciesCardWide: {
    alignItems: 'center',
    flexBasis: '48%',
    flexDirection: 'row',
    flexGrow: 1,
    gap: spacing.sm,
  },
  speciesIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  speciesCopy: {
    flex: 1,
    gap: 2,
  },
  speciesCommon: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  speciesScientific: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  speciesMeasure: {
    alignItems: 'flex-end',
    gap: 2,
  },
  speciesValue: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
  },
  speciesCarbon: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
