import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card, PageHeader, Screen, SectionHeader } from '@/components/ui';
import { colors, radius, spacing } from '@/constants/theme';
import { weatherForecast } from '@/data/demoData';
import { formatShortDate } from '@/utils/format';

export function WeatherScreen() {
  return (
    <Screen>
      <PageHeader
        title="Météo & risques"
        subtitle="Prévisions pour Abidjan et indicateurs utiles au suivi terrain."
      />

      <View style={styles.hero}>
        <View>
          <Text style={styles.live}>Temps réel</Text>
          <View style={styles.temperatureRow}>
            <Text style={styles.temperature}>28°</Text>
            <Text style={styles.unit}>C</Text>
          </View>
          <Text style={styles.condition}>Averses modérées</Text>
        </View>
        <Ionicons name="rainy" size={62} color="#A8D5F2" />
      </View>

      <View style={styles.metrics}>
        <WeatherMetric icon="water" label="Humidité" value="84 %" />
        <WeatherMetric icon="speedometer" label="Vent" value="14 km/h" />
        <WeatherMetric icon="thermometer" label="Ressenti" value="31 °C" />
      </View>

      <SectionHeader title="Prévisions à 5 jours" />
      {weatherForecast.map((day) => (
        <Card key={day.date} style={styles.forecast}>
          <View style={styles.day}>
            <Ionicons
              name={
                day.precipitationProbability > 50
                  ? 'rainy-outline'
                  : 'partly-sunny-outline'
              }
              size={27}
              color={
                day.precipitationProbability > 50
                  ? colors.info
                  : colors.warning
              }
            />
            <Text style={styles.dayLabel}>{formatShortDate(day.date)}</Text>
          </View>
          <View style={styles.forecastDetail}>
            <Text style={styles.rain}>
              {day.precipitationProbability} % pluie
            </Text>
            <Text style={styles.wind}>{day.windSpeed} km/h</Text>
          </View>
          <Text style={styles.range}>
            {day.tempMin}° / {day.tempMax}°
          </Text>
        </Card>
      ))}
    </Screen>
  );
}

function WeatherMetric({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <Card style={styles.metric}>
      <Ionicons name={icon} size={22} color={colors.info} />
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  live: {
    color: '#A9D7C4',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  temperatureRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  temperature: {
    color: colors.white,
    fontSize: 58,
    fontWeight: '900',
    letterSpacing: -3,
  },
  unit: {
    color: '#C8E2D6',
    fontSize: 18,
    marginLeft: spacing.xs,
    marginTop: 12,
  },
  condition: {
    color: '#C8E2D6',
    fontSize: 13,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 10,
  },
  metricValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  forecast: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  day: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    width: 95,
  },
  dayLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  forecastDetail: {
    flex: 1,
    gap: 2,
  },
  rain: {
    color: colors.info,
    fontSize: 12,
    fontWeight: '700',
  },
  wind: {
    color: colors.textMuted,
    fontSize: 11,
  },
  range: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
});
