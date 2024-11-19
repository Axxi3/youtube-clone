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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToVideo = (videoId: string): void => {
  router.push({ name: 'Video', params: { id: videoId } });
};

const formatNumber = (value: number | null): string => {
  if (value !== null) {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      return value.toString();
    }
  }
  return 'N/A';
};

const videoData = ref<any[]>([]);

const url = 'https://yt-api.p.rapidapi.com/home';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
    'x-rapidapi-host': 'yt-api.p.rapidapi.com',
  },
};

const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('API response:', result.data);

    // Filter only objects with type "video"
    videoData.value = (result.data || []).filter((item: any) => item.type === 'video');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>

<style lang="scss" scoped>
</style>
