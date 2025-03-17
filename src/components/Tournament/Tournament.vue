<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWeatherStore } from '../../stores/wheatherStore';

const store = useWeatherStore();
const city = ref<string>('Paris');

const getWeather = () => {
  store.fetchWeather(city.value);
};

onMounted(() => {
  getWeather(); // Charge la météo au montage du composant
});
</script>

<template>
  <div>
    <h2>Météo de {{ city }}</h2>

    <input v-model="city" placeholder="Entrer une ville" />
    <button @click="getWeather">Rechercher</button>

    <div v-if="store.loading">Chargement...</div>
    <div v-if="store.error">{{ store.error }}</div>

    <div v-if="store.weatherData">
      <p>Température : {{ store.weatherData.main.temp }}°C</p>
      <p>Météo : {{ store.weatherData.weather[0].description }}</p>
    </div>
  </div>
</template>
