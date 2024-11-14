<template>
       <NavLayout>
      <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 mr-3.5 pt-4">
      
        <VideoCard
    v-for="(video, index) in videoData"
    :key="video.videoId"
    :title="video.title || 'No title available'"
    :thumbnail="video.thumbnail?.[0]?.url || 'https://via.placeholder.com/360x202'"
    :image="video.channelThumbnail?.[0]?.url || 'https://via.placeholder.com/360x202'"
    :views="`${formatNumber(video.viewCount)} ${video.publishedTimeText}`"
    @click="goToVideo(video.videoId)"
     :user = "video.channelTitle"
/>
        
  
      </div>
    </NavLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../Layouts/NavLayout.vue';

// Function to format numbers (e.g., 1000 to 1k, 1000000 to 1m)
function formatNumber(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
        return value.toString();
    }
}

const videoData = ref([]); // Reactive video data

// API URL and options for fetching trending videos
const url = 'https://yt-api.p.rapidapi.com/trending?geo=US';
const options = {
    method: 'GET',
    headers: {
         'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
    }
};

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("API response:", result.data); // Log the full API response to inspect its structure

        // Filter only objects with type "video"
        videoData.value = (result.data || []).filter(item => item.type === "video");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

onMounted(fetchData); // Fetch data on component mount

// Using useRouter to navigate to a video
const router = useRouter();

function goToVideo(videoId) {
    router.push({ name: 'Video', params: { id: videoId } });
}

</script>

<style lang="scss" scoped>

</style>