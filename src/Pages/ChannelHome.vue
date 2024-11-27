<template>
  <NavLayout>
    <!-- Banner Section -->
    <div v-if="loading" class="flex justify-center items-center h-96 text-white text-2xl">
      Loading, please wait...
    </div>
    <div
      v-if="!loading && ChannelData?.meta?.banner?.[0]?.url"
      class="banner h-36 md:h-48 lg:h-60 bg-cover bg-center relative"
      :style="{ backgroundImage: `url(${ChannelData?.meta?.banner?.[0]?.url ?? ''})` }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Profile Section -->
    <div v-if="!loading && ChannelData" class="flex flex-col sm:flex-row items-center px-6 pt-6 space-y-4 sm:space-y-0">
      <img
        :src="ChannelData?.meta?.avatar?.[0]?.url ?? ''"
        alt="Profile"
        class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800 mx-auto sm:mx-0"
      />
      <div class="sm:ml-6 text-center sm:text-left">
        <h1 class="text-2xl sm:text-3xl font-semibold text-white">
          {{ ChannelData?.meta?.title ?? ' ' }}
        </h1>
        <p class="text-gray-700 text-sm sm:text-lg">
          {{ ChannelData?.meta?.subscriberCountText ?? '' }} subscribers
        </p>
        <a href="https://instagram.com/" class="text-blue-500 hover:underline mt-1 text-sm sm:text-lg">
          {{ ChannelData?.meta?.channelHandle ?? '' }}
        </a>
      </div>
      <button
        class="mt-4 sm:mt-0 sm:ml-auto bg-red-500 hover:bg-red-600 rounded-2xl text-white font-semibold px-4 py-2 sm:px-6 sm:py-3"
      >
        Subscribe
      </button>
    </div>

    <!-- Recommended Videos Section -->
    <div v-if="!loading && ChannelData?.data?.[0]" class="p-2" @click="goToVideo(ChannelData.data[0]?.videoId)">
      <h2 class="text-2xl font-semibold mt-8 pl-5 text-white">Latest Video</h2>
      <VideoPreview
        :thumbnail="ChannelData?.data?.[0]?.thumbnail?.[0]?.url ?? ''"
        :title="ChannelData?.data?.[0]?.title ?? ''"
        :channelName="ChannelData?.meta?.title ?? ''"
        :views="formatNumber(ChannelData?.data?.[0]?.viewCount ?? 0)"
        :uploadTime="ChannelData?.data?.[0]?.publishedTimeText ?? ''"
        duration="13:02"
        isVerified
        description="My11Circle App: https://bit.ly/3MfaJn0 Use my exclusive coupon: YT2022 to get additional 20% extra cash on first deposit..."
      />
    </div>

    <!-- Video Cards -->
    <div v-if="!loading && ChannelData?.data" class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 mr-3.5 pt-4">
      <VideoCard
        v-for="(video, index) in ChannelData?.data"
        :key="index"
        :title="video.title"
        :user="video.channelTitle"
        :views="formatNumber(video.viewCount) + ' - ' + video.publishedTimeText"
        :thumbnail="video.thumbnail[0]?.url ?? ''"
        :videoUrl="video.videoUrl"
        :image="ChannelData?.meta?.avatar?.[0]?.url"
        @click="goToVideo(video.videoId)"
      />
    </div>
  </NavLayout>
</template>

<script lang="ts" setup>
import VideoPreview from '../components/VideoPreview.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import VideoCard from '../components/VideoCard.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';  // Import axios

import { ChannelData, Video } from '../Services/Dataprovider';  // Import the interfaces
import { apiConfig } from '../Services/Config';

const route = useRoute();
const router = useRouter();
const channelID = ref<string>(route.params.id as string);
const ChannelData = ref<ChannelData | null>(null);
const loading = ref<boolean>(true);

// Format number (views)
const formatNumber = (value: number | null): string => {
  if (value !== null && value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value !== null && value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value !== null ? value.toString() : '0';
};

// Fetch data using axios
const fetchData = async (): Promise<void> => {
  const url = `https://yt-api.p.rapidapi.com/channel/videos?id=${channelID.value}`;
 

  try {
    const response = await axios.get(url, apiConfig);
    const result = response.data;

    if (result?.data) {
      ChannelData.value = result as ChannelData;
    } else {
      console.error('No data found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

// Navigate to a specific video
const goToVideo = (videoId: string): void => {
  router.push({ name: 'Video', params: { id: videoId } });
};

// Fetch data on component mount
onMounted(fetchData);
</script>

<style lang="scss" scoped>
/* Your component specific styles here */
</style>
