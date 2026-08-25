import { useState, useEffect } from "react";

const LAT = 59.9139;
const LON = 10.7522;
const URL = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`;

const SYMBOL_MAP = {
  clearsky_day: "Clear",
  clearsky_night: "Clear",
  fair_day: "Fair",
  fair_night: "Fair",
  partlycloudy_day: "Partly cloudy",
  partlycloudy_night: "Partly cloudy",
  cloudy: "Cloudy",
  fog: "Fog",
  lightrain: "Light rain",
  rain: "Rain",
  heavyrain: "Heavy rain",
  lightrainshowers_day: "Rain showers",
  lightrainshowers_night: "Rain showers",
  rainshowers_day: "Rain showers",
  rainshowers_night: "Rain showers",
  heavyrainshowers_day: "Heavy showers",
  heavyrainshowers_night: "Heavy showers",
  lightsnow: "Light snow",
  snow: "Snow",
  heavysnow: "Heavy snow",
  sleet: "Sleet",
  thunder: "Thunder",
};

function getCondition(symbol) {
  const base = symbol?.replace(/_day|_night/, "");
  return SYMBOL_MAP[symbol] || SYMBOL_MAP[base] || "Cloudy";
}

export function useWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((data) => {
        const series = data.properties.timeseries;
        const now = series[0];
        const details = now.data.instant.details;
        const symbol = now.data.next_1_hours?.summary?.symbol_code
          ?? now.data.next_6_hours?.summary?.symbol_code;

        // Build 4-day forecast from series at noon each day
        const seen = new Set();
        const forecast = [];
        for (const entry of series) {
          const date = new Date(entry.time);
          const dayKey = date.toISOString().slice(0, 10);
          const hour = date.getUTCHours();
          if (!seen.has(dayKey) && hour === 12) {
            seen.add(dayKey);
            const sym = entry.data.next_6_hours?.summary?.symbol_code
              ?? entry.data.next_1_hours?.summary?.symbol_code;
            forecast.push({
              day: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "Europe/Oslo" }),
              temp: Math.round(entry.data.instant.details.air_temperature),
              symbol: sym,
            });
            if (forecast.length === 4) break;
          }
        }

        setWeather({
          temp: Math.round(details.air_temperature),
          feelsLike: Math.round(details.air_temperature - (details.wind_speed * 0.7)),
          humidity: Math.round(details.relative_humidity),
          wind: Math.round(details.wind_speed * 3.6), // m/s → km/h
          condition: getCondition(symbol),
          symbol,
          forecast,
        });
      })
      .catch(() => null);
  }, []);

  return weather;
}
