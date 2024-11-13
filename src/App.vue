<script setup>
import { onMounted, ref } from 'vue';
import NavLayout from './Layouts/NavLayout.vue';
import VideoCard from './components/VideoCard.vue';
import HomePage from './Pages/HomePage.vue';
const videoData = ref([]);






</script>




<template>
  <div class="">
    <router-link  to="/">Home</router-link>
    <router-link  to="/trending">Trending</router-link>
    <router-link  to="/channel">Channel</router-link>

  </div>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
