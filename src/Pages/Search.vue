<template>
  <NavLayout class="container" >
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

// Fetch search results using the API
const fetchSearchResults = async (): Promise<void> => {
  try {
    videoData.value = await getSearchResults(query.value); // Use the API method
    console.log('Fetched search results:', videoData.value);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

// Navigate to video page
const goToVideo = (id: string): void => {
  router.push({ name: 'Video', params: { id } });
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchSearchResults();
});
</script>


<style scoped>
/* Add your styles here */
</style>
