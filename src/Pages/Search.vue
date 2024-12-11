<template>
  <NavLayout class="container" :prompt="query" >
    <div class="flex flex-col gap-5">
      <!-- Render video cards dynamically -->
      <SearchResults
        v-for="(video, index) in videoData"
        :key="index"
        :video="video"
        @click="goToVideo(video.videoId)"
      />
    </div>
  </NavLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SearchResults from '../components/SearchResults.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { getSearchResults } from '../Services/API'; // Import the search API function
import type { HomeVideo } from '../Services/Dataprovider'; // Import the HomeVideo type

// Define reactive states with correct typing
const videoData = ref<HomeVideo[]>([]); // Ensure proper typing of video data
const route = useRoute(); // Access route parameters
const router = useRouter(); // For navigation
const query = ref<string>(route.params.query as string); // Current search query

// Use the getSearchResults function from API.ts directly
onMounted(async () => {
  videoData.value = await getSearchResults(query.value);
  console.log('Fetched search results:', videoData.value);
});

// Navigate to video page
const goToVideo = (id: string): void => {
  router.push({ name: 'Video', params: { id } });
};
</script>

<style scoped>
/* Add your styles here */
</style>
