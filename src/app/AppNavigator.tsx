import { Ionicons } from '@expo/vector-icons';
import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertsScreen } from '@/features/alerts/AlertsScreen';
import { DashboardScreen } from '@/features/dashboard/DashboardScreen';
import { FarmsScreen } from '@/features/farms/FarmsScreen';
import { IncidentsScreen } from '@/features/incidents/IncidentsScreen';
import { ReportIncidentScreen } from '@/features/incidents/ReportIncidentScreen';
import { MapScreen } from '@/features/map/MapScreen';
import { MoreScreen } from '@/features/more/MoreScreen';
import { ParcelsScreen } from '@/features/parcels/ParcelsScreen';
import { SurveillanceScreen } from '@/features/surveillance/SurveillanceScreen';
import { WeatherScreen } from '@/features/weather/WeatherScreen';
import { colors } from '@/constants/theme';

export type RootStackParamList = {
  MainTabs: undefined;
  Farms: undefined;
  Parcels: undefined;
  Weather: undefined;
  Surveillance: undefined;
  Incidents: undefined;
  ReportIncident: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Map: undefined;
  Alerts: undefined;
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
  Alerts: 'Alertes',
  More: 'Plus',
};

const tabIcons: Record<
  keyof MainTabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  Dashboard: { active: 'grid', inactive: 'grid-outline' },
  Map: { active: 'map', inactive: 'map-outline' },
  Alerts: { active: 'notifications', inactive: 'notifications-outline' },
  More: { active: 'apps', inactive: 'apps-outline' },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primaryDark },
        headerShadowVisible: false,
        headerTintColor: colors.white,
        headerTitle: 'NAAFTrack',
        headerTitleStyle: { fontSize: 19, fontWeight: '900' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarHideOnKeyboard: true,
        tabBarLabel: tabLabels[route.name],
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 7,
          paddingTop: 7,
        },
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
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
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
          headerStyle: { backgroundColor: colors.primaryDark },
          headerShadowVisible: false,
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
