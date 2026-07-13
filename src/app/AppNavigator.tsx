import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { AlertsScreen } from '@/features/alerts/AlertsScreen';
import { AnalyticsScreen } from '@/features/analytics/AnalyticsScreen';
import { AiAssistantScreen } from '@/features/artificial-intelligence/AiAssistantScreen';
import { DashboardScreen } from '@/features/dashboard/DashboardScreen';
import { FarmsScreen } from '@/features/farms/FarmsScreen';
import { IncidentsScreen } from '@/features/incidents/IncidentsScreen';
import { ReportIncidentScreen } from '@/features/incidents/ReportIncidentScreen';
import { IntegrationsScreen } from '@/features/integrations/IntegrationsScreen';
import { MapScreen } from '@/features/map/MapScreen';
import { MoreScreen } from '@/features/more/MoreScreen';
import { OperationsScreen } from '@/features/operations/OperationsScreen';
import { ParcelsScreen } from '@/features/parcels/ParcelsScreen';
import { SurveillanceScreen } from '@/features/surveillance/SurveillanceScreen';
import { WeatherScreen } from '@/features/weather/WeatherScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Farms: undefined;
  Parcels: undefined;
  Weather: undefined;
  Surveillance: undefined;
  Incidents: undefined;
  ReportIncident: undefined;
  Alerts: undefined;
  AiAssistant: undefined;
  Integrations: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Map: undefined;
  Analytics: undefined;
  Operations: undefined;
  More: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    border: colors.border,
    card: colors.primaryDark,
    notification: colors.danger,
    primary: colors.primary,
    text: colors.white,
  },
};

const tabLabels: Record<keyof MainTabParamList, string> = {
  Dashboard: 'Accueil',
  Map: 'Carte',
  Analytics: 'Analyses',
  Operations: 'Opérations',
  More: 'Plus',
};

const tabIcons: Record<
  keyof MainTabParamList,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
  }
> = {
  Dashboard: { active: 'grid', inactive: 'grid-outline' },
  Map: { active: 'map', inactive: 'map-outline' },
  Analytics: { active: 'analytics', inactive: 'analytics-outline' },
  Operations: { active: 'radio', inactive: 'radio-outline' },
  More: { active: 'apps', inactive: 'apps-outline' },
};

function MainTabs() {
  const { width } = useWindowDimensions();
  const desktop = width >= 1024;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.primaryDark },
        headerTintColor: colors.white,
        headerTitle: 'NaafGeoForest Intelligence',
        headerTitleStyle: { fontSize: 19, fontWeight: '900' },
        tabBarActiveTintColor: colors.primary,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons
            color={color}
            name={
              focused
                ? tabIcons[route.name].active
                : tabIcons[route.name].inactive
            }
            size={size}
          />
        ),
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabel: tabLabels[route.name],
        tabBarLabelPosition: desktop ? 'beside-icon' : 'below-icon',
        tabBarLabelStyle: {
          fontSize: desktop ? 13 : 10,
          fontWeight: '700',
        },
        tabBarPosition: desktop ? 'left' : 'bottom',
        tabBarStyle: {
          backgroundColor: colors.white,
          borderColor: colors.border,
          height: desktop ? undefined : 64,
          paddingBottom: desktop ? spacing.md : 7,
          paddingTop: desktop ? spacing.xl : 7,
          width: desktop ? 230 : undefined,
        },
        tabBarVariant: desktop ? 'material' : 'uikit',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Operations" component={OperationsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.primaryDark },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '800' },
        }}
      >
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Farms"
          component={FarmsScreen}
          options={{ title: 'Exploitations' }}
        />
        <RootStack.Screen
          name="Parcels"
          component={ParcelsScreen}
          options={{ title: 'Parcelles' }}
        />
        <RootStack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{ title: 'Météo' }}
        />
        <RootStack.Screen
          name="Surveillance"
          component={SurveillanceScreen}
          options={{ title: 'Surveillance' }}
        />
        <RootStack.Screen
          name="Incidents"
          component={IncidentsScreen}
          options={{ title: 'Incidents' }}
        />
        <RootStack.Screen
          name="ReportIncident"
          component={ReportIncidentScreen}
          options={{ title: 'Nouveau signalement' }}
        />
        <RootStack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{ title: 'Alertes' }}
        />
        <RootStack.Screen
          name="AiAssistant"
          component={AiAssistantScreen}
          options={{ title: 'Intelligence artificielle' }}
        />
        <RootStack.Screen
          name="Integrations"
          component={IntegrationsScreen}
          options={{ title: 'Intégrations' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
