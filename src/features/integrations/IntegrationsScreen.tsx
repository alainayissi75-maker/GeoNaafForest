import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Card, PageHeader, Screen, SectionHeader } from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { integrations } from '@/data/platformData';
import { apiRequest } from '@/services/api/client';
import type { IntegrationStatus } from '@/types/platform';

export function IntegrationsScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [providerStates, setProviderStates] = useState(integrations);

  useEffect(() => {
    apiRequest<
      {
        id: IntegrationStatus['id'];
        status: 'configured' | 'not_configured';
      }[]
    >('/api/integrations')
      .then((states) => {
        setProviderStates((currentStates) =>
          currentStates.map((integration) => {
            const state = states.find((item) => item.id === integration.id);
            return state
              ? {
                  ...integration,
                  configured: state.status === 'configured',
                }
              : integration;
          }),
        );
      })
      .catch(() => undefined);
  }, []);

  return (
    <Screen contentStyle={wide ? styles.wideContent : undefined}>
      <PageHeader
        title="Intégrations de données"
        subtitle="Connecteurs satellite, forestiers, incendie et intelligence artificielle."
      />

      <View style={styles.securityBanner}>
        <Ionicons name="lock-closed" size={22} color={colors.info} />
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerTitle}>Secrets protégés côté serveur</Text>
          <Text style={styles.bannerText}>
            Les clés ne sont jamais intégrées au bundle Expo. Configurez-les
            uniquement dans l’environnement de l’API.
          </Text>
        </View>
      </View>

      <SectionHeader title="Connecteurs disponibles" />
      <View style={styles.grid}>
        {providerStates.map((integration) => (
          <IntegrationCard
            integration={integration}
            key={integration.id}
            wide={wide}
          />
        ))}
      </View>

      <SectionHeader title="Pipeline professionnel" />
      <Card style={styles.pipeline}>
        <PipelineStep
          icon="cloud-download"
          number="01"
          text="Ingestion des catalogues et acquisitions"
        />
        <PipelineDivider />
        <PipelineStep
          icon="layers"
          number="02"
          text="Prétraitement, nuages et harmonisation"
        />
        <PipelineDivider />
        <PipelineStep
          icon="analytics"
          number="03"
          text="Indices, anomalies et prédiction des risques"
        />
        <PipelineDivider />
        <PipelineStep
          icon="notifications"
          number="04"
          text="Alertes, missions et suivi d’intervention"
        />
      </Card>
    </Screen>
  );
}

function IntegrationCard({
  integration,
  wide,
}: {
  integration: IntegrationStatus;
  wide: boolean;
}) {
  const color = categoryColor(integration.category);

  return (
    <Card
      style={[styles.integrationCard, { flexBasis: wide ? '31%' : '47%' }]}
    >
      <View style={styles.integrationHeader}>
        <View style={[styles.integrationIcon, { backgroundColor: `${color}18` }]}>
          <Ionicons
            color={color}
            name={categoryIcon(integration.category)}
            size={24}
          />
        </View>
        <View
          style={[
            styles.status,
            {
              backgroundColor: integration.configured
                ? '#E4F3E9'
                : colors.surfaceMuted,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: integration.configured
                  ? colors.success
                  : colors.textMuted,
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: integration.configured
                  ? colors.success
                  : colors.textMuted,
              },
            ]}
          >
            {integration.configured ? 'Connecté' : 'À configurer'}
          </Text>
        </View>
      </View>
      <Text style={styles.name}>{integration.name}</Text>
      <Text style={styles.description}>{integration.description}</Text>
      <View style={styles.variables}>
        {integration.environmentVariables.map((variable) => (
          <Text key={variable} style={styles.variable}>
            {variable}
          </Text>
        ))}
      </View>
    </Card>
  );
}

function PipelineStep({
  icon,
  number,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  number: string;
  text: string;
}) {
  return (
    <View style={styles.pipelineStep}>
      <View style={styles.pipelineIcon}>
        <Ionicons name={icon} size={21} color={colors.primary} />
      </View>
      <View style={styles.pipelineCopy}>
        <Text style={styles.pipelineNumber}>{number}</Text>
        <Text style={styles.pipelineText}>{text}</Text>
      </View>
    </View>
  );
}

function PipelineDivider() {
  return <View style={styles.pipelineDivider} />;
}

function categoryIcon(
  category: IntegrationStatus['category'],
): keyof typeof Ionicons.glyphMap {
  const icons = {
    satellite: 'planet',
    forest: 'leaf',
    fire: 'flame',
    'artificial-intelligence': 'sparkles',
  } as const;
  return icons[category];
}

function categoryColor(category: IntegrationStatus['category']): string {
  const palette = {
    satellite: colors.info,
    forest: colors.success,
    fire: colors.danger,
    'artificial-intelligence': colors.purple,
  };
  return palette[category];
}

const styles = StyleSheet.create({
  wideContent: {
    alignSelf: 'center',
    maxWidth: 1440,
    width: '100%',
  },
  securityBanner: {
    alignItems: 'flex-start',
    backgroundColor: '#E8F1FA',
    borderRadius: radius.lg,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  bannerCopy: {
    flex: 1,
    gap: 3,
  },
  bannerTitle: {
    color: colors.info,
    fontSize: 13,
    fontWeight: '900',
  },
  bannerText: {
    color: colors.info,
    fontSize: 11,
    lineHeight: 17,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  integrationCard: {
    flexGrow: 1,
    gap: spacing.sm,
    minWidth: 160,
  },
  integrationHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  integrationIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  status: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  statusDot: {
    borderRadius: radius.pill,
    height: 7,
    width: 7,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  description: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 17,
  },
  variables: {
    gap: spacing.xs,
    marginTop: 'auto',
  },
  variable: {
    color: colors.primary,
    fontFamily: 'monospace',
    fontSize: 9,
  },
  pipeline: {
    gap: spacing.md,
  },
  pipelineStep: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  pipelineIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  pipelineCopy: {
    flex: 1,
    gap: 2,
  },
  pipelineNumber: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  pipelineText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  pipelineDivider: {
    backgroundColor: colors.border,
    height: 18,
    marginLeft: 21,
    width: 2,
  },
});
