import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PageHeader, Screen } from '@/components/ui';
import type { RootStackParamList } from '@/app/AppNavigator';
import { colors, radius, spacing } from '@/constants/theme';
import type { IncidentType, Severity } from '@/types/domain';
import { incidentTypeLabels, severityLabels } from '@/utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'ReportIncident'>;

const incidentTypes: IncidentType[] = [
  'wildfire',
  'deforestation',
  'degradation',
];
const severities: Severity[] = ['low', 'medium', 'high', 'critical'];

export function ReportIncidentScreen({ navigation }: Props) {
  const [type, setType] = useState<IncidentType>('wildfire');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');

  function submit() {
    if (title.trim().length < 5 || description.trim().length < 10) {
      Alert.alert(
        'Informations incomplètes',
        'Ajoutez un titre et une description suffisamment détaillés.',
      );
      return;
    }

    Alert.alert(
      'Signalement préparé',
      'Le formulaire mobile est prêt. Configurez EXPO_PUBLIC_API_URL pour enregistrer le signalement sur votre API.',
      [{ text: 'Fermer', onPress: () => navigation.goBack() }],
    );
  }

  return (
    <Screen keyboardShouldPersistTaps="handled">
      <PageHeader
        title="Nouveau signalement"
        subtitle="Décrivez l’événement observé sur le terrain."
      />

      <FieldLabel label="Type d’incident" />
      <View style={styles.chipGroup}>
        {incidentTypes.map((value) => (
          <Chip
            key={value}
            active={type === value}
            label={incidentTypeLabels[value]}
            onPress={() => setType(value)}
          />
        ))}
      </View>

      <FieldLabel label="Sévérité" />
      <View style={styles.chipGroup}>
        {severities.map((value) => (
          <Chip
            key={value}
            active={severity === value}
            label={severityLabels[value]}
            onPress={() => setSeverity(value)}
          />
        ))}
      </View>

      <FieldLabel label="Titre" />
      <TextInput
        onChangeText={setTitle}
        placeholder="Ex. Feu détecté secteur nord"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={title}
      />

      <FieldLabel label="Description" />
      <TextInput
        multiline
        onChangeText={setDescription}
        placeholder="Détails de l’observation..."
        placeholderTextColor={colors.textMuted}
        style={[styles.input, styles.textArea]}
        textAlignVertical="top"
        value={description}
      />

      <FieldLabel label="Surface estimée (ha)" />
      <TextInput
        inputMode="decimal"
        onChangeText={setArea}
        placeholder="0"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={area}
      />

      <Pressable
        accessibilityRole="button"
        onPress={submit}
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>Enregistrer le signalement</Text>
      </Pressable>
    </Screen>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.label}>{label}</Text>;
}

function Chip({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : undefined]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: -spacing.sm,
    marginTop: spacing.xs,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  textArea: {
    minHeight: 120,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  submitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
