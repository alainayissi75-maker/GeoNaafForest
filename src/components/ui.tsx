import type { PropsWithChildren, ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';
import type { HealthStatus, RiskLevel, Severity } from '@/types/domain';

interface ScreenProps extends ScrollViewProps {
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  contentStyle,
  ...props
}: PropsWithChildren<ScreenProps>) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.screenContent, contentStyle]}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.pageHeader}>
      <View style={styles.pageHeaderCopy}>
        <Text style={styles.pageTitle}>{title}</Text>
        <Text style={styles.pageSubtitle}>{subtitle}</Text>
      </View>
      {action}
    </View>
  );
}

export function SectionHeader({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
    </View>
  );
}

export function Card({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = colors.primary,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <Card style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${accent}18` }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statDetail}>{detail}</Text>
    </Card>
  );
}

const statusColors: Record<
  Severity | RiskLevel | HealthStatus,
  { background: string; text: string }
> = {
  low: { background: '#E4F3E9', text: colors.success },
  good: { background: '#E4F3E9', text: colors.success },
  medium: { background: '#FFF0DB', text: colors.warning },
  moderate: { background: '#FFF0DB', text: colors.warning },
  high: { background: '#FFE6D7', text: '#B95B16' },
  stressed: { background: '#FFE6D7', text: '#B95B16' },
  critical: { background: '#FBE2E0', text: colors.danger },
};

export function StatusBadge({
  value,
  label,
}: {
  value: Severity | RiskLevel | HealthStatus;
  label: string;
}) {
  const palette = statusColors[value];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <Text style={[styles.badgeText, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

export function ProgressBar({
  value,
  color = colors.primary,
}: {
  value: number;
  color?: string;
}) {
  const clampedValue = Math.min(Math.max(value, 0), 1);

  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressValue,
          { backgroundColor: color, width: `${clampedValue * 100}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  pageHeaderCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  pageSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    marginTop: spacing.sm,
    gap: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  sectionCaption: {
    color: colors.textMuted,
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '46%',
    gap: spacing.xs,
  },
  statIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 42,
  },
  statValue: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  statDetail: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  progressTrack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    height: 7,
    overflow: 'hidden',
    width: '100%',
  },
  progressValue: {
    borderRadius: radius.pill,
    height: '100%',
  },
});
