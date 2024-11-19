<template>
  <NavLayout class="container">
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

// Define type for individual video
interface Video {
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  time: string;
  likes: string;
  engagementRate: string;
  tags: string[];
  videoId?: string; // Optional field for video ID
  type?: string; // Optional type field for filtering
}

// Reactive state for video data and query
const videoData = ref<Video[]>([]);
const route = useRoute();
const router = useRouter();
const query = ref<string>(route.params.query as string);

// API configuration
const url = `https://yt-api.p.rapidapi.com/search?query=${query.value}`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
    'x-rapidapi-host': 'yt-api.p.rapidapi.com',
  },
};

// Fetch data from the API
const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Filter only objects with type "video"
    videoData.value = (result.data || []).filter((item: Video) => item.type === 'video');
    console.log('Fetched videos:', videoData.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Navigate to video page
const goToVideo = (id: string | undefined): void => {
  if (id) {
    router.push({ name: 'Video', params: { id } });
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add your styles here */
</style>
