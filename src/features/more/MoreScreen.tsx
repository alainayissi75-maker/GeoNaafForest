import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PageHeader, Screen, SectionHeader } from '@/components/ui';
import type { RootStackParamList } from '@/app/AppNavigator';
import { colors, radius, spacing } from '@/constants/theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type MenuRoute = Exclude<keyof RootStackParamList, 'MainTabs' | 'ReportIncident'>;

const menuItems: {
  route: MenuRoute;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  {
    route: 'AiAssistant',
    title: 'Intelligence artificielle',
    description: 'Anomalies, synthèses et prévision des risques',
    icon: 'sparkles',
    color: colors.purple,
  },
  {
    route: 'Integrations',
    title: 'Intégrations',
    description: 'Sentinel Hub, GFW, FIRMS, Copernicus et IA',
    icon: 'git-network',
    color: colors.info,
  },
  {
    route: 'Alerts',
    title: 'Alertes',
    description: 'SMS, email, push et accusés de réception',
    icon: 'notifications',
    color: colors.danger,
  },
  {
    route: 'Farms',
    title: 'Exploitations',
    description: 'Coopératives et domaines agricoles',
    icon: 'business',
    color: colors.info,
  },
  {
    route: 'Parcels',
    title: 'Parcelles',
    description: 'Cultures et indices de végétation',
    icon: 'leaf',
    color: colors.success,
  },
  {
    route: 'Weather',
    title: 'Météo',
    description: 'Prévisions et risques climatiques',
    icon: 'partly-sunny',
    color: colors.warning,
  },
  {
    route: 'Surveillance',
    title: 'Surveillance',
    description: 'Zones forestières et niveaux de risque',
    icon: 'shield-checkmark',
    color: colors.purple,
  },
  {
    route: 'Incidents',
    title: 'Incidents',
    description: 'Feux, déforestation et signalements',
    icon: 'warning',
    color: colors.danger,
  },
];

export function MoreScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <Screen>
      <PageHeader
        title="Modules"
        subtitle="Accédez aux outils métier de NAAFTrack."
      />

      <SectionHeader title="Gestion et suivi" />
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <Pressable
            accessibilityRole="button"
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={styles.menuItem}
          >
            <View
              style={[styles.menuIcon, { backgroundColor: `${item.color}18` }]}
            >
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.menuCopy}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.about}>
        <View style={styles.aboutIcon}>
          <Ionicons name="earth" size={25} color={colors.primary} />
        </View>
        <View style={styles.aboutCopy}>
          <Text style={styles.aboutTitle}>NAAFTrack Forest Intelligence</Text>
          <Text style={styles.aboutText}>
            Application Expo universelle pour mobile, Web et bureau, connectée
            à une API sécurisée et extensible.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  menuIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  menuCopy: {
    flex: 1,
    gap: 3,
  },
  menuTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  menuDescription: {
    color: colors.textMuted,
    fontSize: 11,
  },
  about: {
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  aboutIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  aboutCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  aboutTitle: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
  },
  aboutText: {
    color: colors.primaryDark,
    fontSize: 12,
    lineHeight: 18,
  },
});
