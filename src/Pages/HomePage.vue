
<template>
    <NavLayout>
      <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:mr-3.5 pt-4">
        
        <VideoCard 
        
    v-for="(video, index) in videoData"
    :key="video.videoId"
    :title="video.title || 'No title available'"
    :thumbnail="video.thumbnail?.[0]?.url || 'https://via.placeholder.com/360x202'"
    :image="video.channelThumbnail?.[0]?.url || 'https://via.placeholder.com/360x202'"
     :views="`${formatNumber(video.viewCount)} ${video.publishedTimeText}` || 'N/A'"
       @click="goToVideo(video.videoId)"
  />
        
  
      </div>
    </NavLayout>
  </template>

<script setup>
import { onMounted, ref } from 'vue';

import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function goToVideo(videoId) {
    router.push({ name: 'Video', params: { id: videoId } });
}

function formatNumber(value) {
  if(value !== null){
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return value.toString();
    }
  } else {
    return 'N/A'
  }
    
}

const videoData = ref([]);

const url = 'https://yt-api.p.rapidapi.com/home';
const options = {
	method: 'GET',
	headers: {
		  'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
	}
};

async function fetchData() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log("API response:", result.data); // Log full API response to inspect its structure

		// Filter only objects with type "video"
		videoData.value = (result.data || []).filter(item => item.type === "video");
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

onMounted(fetchData);




</script>

<style lang="scss" scoped>

</style>