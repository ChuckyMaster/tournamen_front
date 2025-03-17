import { defineStore } from 'pinia';
import axios from 'axios';

// Définition des types pour la météo
interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    weatherData: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWeather(city: string) {
      this.loading = true;
      this.error = null;

      try {
        const apiKey = 'TON_API_KEY'; // Remplace par ta clé API
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        this.weatherData = response.data;
      } catch (err) {
        this.error = 'Impossible de récupérer la météo.';
      } finally {
        this.loading = false;
      }
    }
  }
});
