import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Card,
  PageHeader,
  Screen,
  SectionHeader,
  StatusBadge,
} from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { createLocalAnalysis } from '@/services/ai/localAnalysis';
import { apiRequest } from '@/services/api/client';
import type { AiAnalysis } from '@/types/platform';

const examplePrompts = [
  'Analyse une baisse du NDVI accompagnée de fumée dans la forêt de Taï.',
  'Évalue le risque carbone après une perte de couvert de 38 hectares.',
  'Propose une mission drone pour vérifier une coupe illégale.',
];

export function AiAssistantScreen() {
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [analysis, setAnalysis] = useState<AiAnalysis>();
  const [loading, setLoading] = useState(false);

  async function analyze() {
    const sanitizedPrompt = prompt.trim();
    if (sanitizedPrompt.length < 10) {
      return;
    }

    setLoading(true);
    try {
      const result = await apiRequest<AiAnalysis>('/api/ai/analyze', {
        body: JSON.stringify({ prompt: sanitizedPrompt, provider: 'auto' }),
        method: 'POST',
      });
      setAnalysis(result);
    } catch {
      setAnalysis(createLocalAnalysis(sanitizedPrompt));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen keyboardShouldPersistTaps="handled">
      <PageHeader
        title="Centre d’intelligence artificielle"
        subtitle="Détection d’anomalies, synthèse opérationnelle et prévision des risques."
      />

      <View style={styles.modeBanner}>
        <Ionicons name="shield-checkmark" size={21} color={colors.primary} />
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerTitle}>Architecture sécurisée</Text>
          <Text style={styles.bannerText}>
            OpenAI et Gemini sont appelés uniquement par l’API. Sans clé, le
            moteur local reste disponible.
          </Text>
        </View>
      </View>

      <Card style={styles.promptCard}>
        <Text style={styles.label}>Observation à analyser</Text>
        <TextInput
          multiline
          onChangeText={setPrompt}
          placeholder="Décrivez une anomalie, un incident ou un besoin de prévision..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          textAlignVertical="top"
          value={prompt}
        />
        <Pressable
          accessibilityRole="button"
          disabled={loading}
          onPress={analyze}
          style={[styles.button, loading ? styles.buttonDisabled : undefined]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Ionicons name="sparkles" size={19} color={colors.white} />
          )}
          <Text style={styles.buttonText}>
            {loading ? 'Analyse en cours…' : 'Analyser le risque'}
          </Text>
        </Pressable>
      </Card>

      <SectionHeader title="Exemples rapides" />
      <View style={styles.examples}>
        {examplePrompts.map((example) => (
          <Pressable
            accessibilityRole="button"
            key={example}
            onPress={() => setPrompt(example)}
            style={styles.example}
          >
            <Ionicons
              name="flash-outline"
              size={17}
              color={colors.warning}
            />
            <Text style={styles.exampleText}>{example}</Text>
          </Pressable>
        ))}
      </View>

      {analysis ? (
        <>
          <SectionHeader title="Résultat de l’analyse" />
          <Card style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.provider}>
                  Moteur {providerLabel(analysis.provider)}
                </Text>
                <Text style={styles.confidence}>
                  Confiance {(analysis.confidence * 100).toFixed(0)} %
                </Text>
                {analysis.configuration === 'not_configured' ? (
                  <Text style={styles.configuration}>
                    Fournisseur demandé non configuré · repli local
                  </Text>
                ) : null}
              </View>
              <StatusBadge
                label={`Risque ${riskLabel(analysis.riskLevel)}`}
                value={analysis.riskLevel}
              />
            </View>
            <Text style={styles.summary}>{analysis.summary}</Text>

            <Text style={styles.resultTitle}>Anomalies détectées</Text>
            {analysis.anomalies.map((anomaly) => (
              <ResultRow
                icon="warning-outline"
                key={anomaly}
                text={anomaly}
              />
            ))}

            <Text style={styles.resultTitle}>Actions recommandées</Text>
            {analysis.recommendations.map((recommendation) => (
              <ResultRow
                icon="checkmark-circle-outline"
                key={recommendation}
                text={recommendation}
              />
            ))}
          </Card>
        </>
      ) : null}

      <SectionHeader title="Capacités prévues" />
      <View style={styles.capabilityGrid}>
        <Capability
          icon="scan"
          text="Détection automatique d’anomalies"
        />
        <Capability
          icon="analytics"
          text="Prévision des risques forestiers"
        />
        <Capability
          icon="images"
          text="Analyse multimodale des images"
        />
        <Capability
          icon="document-text"
          text="Synthèse des rapports terrain"
        />
      </View>
    </Screen>
  );
}

function ResultRow({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.resultRow}>
      <Ionicons name={icon} size={17} color={colors.primary} />
      <Text style={styles.resultText}>{text}</Text>
    </View>
  );
}

function Capability({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <Card style={styles.capability}>
      <Ionicons name={icon} size={23} color={colors.purple} />
      <Text style={styles.capabilityText}>{text}</Text>
    </Card>
  );
}

function providerLabel(provider: AiAnalysis['provider']): string {
  if (provider === 'openai') {
    return 'OpenAI';
  }
  if (provider === 'gemini') {
    return 'Gemini';
  }
  return 'local';
}

function riskLabel(risk: AiAnalysis['riskLevel']): string {
  const labels = {
    low: 'faible',
    medium: 'moyen',
    high: 'élevé',
    critical: 'critique',
  };
  return labels[risk];
}

const styles = StyleSheet.create({
  modeBanner: {
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  bannerCopy: {
    flex: 1,
    gap: 3,
  },
  bannerTitle: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
  },
  bannerText: {
    color: colors.primaryDark,
    fontSize: 11,
    lineHeight: 17,
  },
  promptCard: {
    gap: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    minHeight: 130,
    padding: spacing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    padding: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  examples: {
    gap: spacing.sm,
  },
  example: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  exampleText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  resultCard: {
    gap: spacing.md,
  },
  resultHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  provider: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  confidence: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  configuration: {
    color: colors.warning,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  summary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  resultText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  capabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  capability: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: spacing.sm,
    minWidth: 145,
  },
  capabilityText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
});
