<template>
  <NavLayout>
    <!-- Banner Section -->
    <div v-if="channelData !== null"
      class="banner h-36 md:h-48 lg:h-60 bg-cover bg-center relative"
      :style="{
        backgroundImage: `url(${channelData.meta?.banner?.[0]?.url || defaultBanner})`
      }"
    >
      <!-- Overlay for Banner -->
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Loading Text -->
    <div v-if="loading" class="flex justify-center items-center h-96 text-white text-2xl">
      Loading, please wait...
    </div>

    <!-- Profile Section -->
    <div v-else-if="channelData !== null" class="flex items-center px-6 pt-6">
      <img
        :src="channelData.meta?.avatar?.[0]?.url || defaultAvatar"
        alt="Profile"
        class="w-32 h-32 rounded-full border-4 border-gray-800"
      />
      <div class="ml-6">
        <h1 class="text-3xl font-semibold text-white">
          {{ channelData.meta?.title || 'Channel Title' }}
        </h1>
        <p class="text-gray-400 text-lg">
          {{ channelData.meta?.subscriberCountText || '0 subscribers' }}
        </p>
        <a
          v-if="channelData.meta?.channelHandle"
          :href="`https://instagram.com/${channelData.meta.channelHandle}`"
          class="text-blue-500 hover:underline mt-1 text-lg"
        >
          {{ channelData.meta.channelHandle }}
        </a>
      </div>
      <button class="ml-auto bg-red-500 hover:bg-red-600 rounded-2xl text-white font-semibold px-6 py-3">
        Subscribe
      </button>
    </div>

    <!-- Latest Video Section -->
    <div v-if="!loading && channelData !== null && channelData.data?.length" class="p-2">
      <h2 class="text-2xl font-semibold mt-8 pl-5 text-white">Latest Video</h2>
      <div class="flex flex-col gap-7">
        <VideoPreview
          v-for="(video, index) in channelData.data.slice(0, 1)"
          :key="index"
          :thumbnail="video.thumbnail?.[0]?.url || defaultThumbnail"
          :title="video.title || 'Untitled Video'"
          :channelName="channelData.meta?.title || 'Channel Name'"
          :views="formatNumber(video.viewCount)"
          :uploadTime="video.publishedTimeText || 'Unknown Time'"
          :duration="video.duration || '0:00'"
          isVerified
          :description="video.description || 'No description available'"
        />
      </div>
    </div>

    <!-- More Content -->
    <div v-if="!loading && channelData !== null && channelData.data?.length" class="w-full flex flex-col items-center justify-between pr-5">
      <h2 class="text-2xl font-semibold mt-8 pl-5 text-white mb-4">Latest Videos</h2>
      <VideoPreview
        v-for="(video, index) in channelData.data"
        :key="index"
        :thumbnail="video.thumbnail?.[0]?.url || defaultThumbnail"
        :title="video.title || 'Untitled Video'"
        :channelName="channelData.meta?.title || 'Channel Name'"
        :views="formatNumber(video.viewCount)"
        :uploadTime="video.publishedTimeText || 'Unknown Time'"
        :duration="video.duration || '0:00'"
        isVerified
        :description="video.description || 'No description available'"
      />
    </div>
  </NavLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavLayout from '../Layouts/NavLayout.vue';
import VideoPreview from '../components/VideoPreview.vue';
import axios from 'axios';

// Import interfaces from Dataprovider
import { ChannelData as channelDataInterface } from '../Services/Dataprovider';
import { apiConfig } from '../Services/Config';

// Reactive variables
const route = useRoute();
const router = useRouter();

const channelID = ref<string>(route.params.id as string);
const channelData = ref<channelDataInterface | null>(null); // Renamed to avoid conflict
const loading = ref<boolean>(true);

const defaultBanner: string = 'https://via.placeholder.com/1920x400?text=Channel+Banner';
const defaultAvatar: string = 'https://via.placeholder.com/150?text=Avatar';
const defaultThumbnail: string = 'https://via.placeholder.com/320x180?text=Video+Thumbnail';

// Format view count (e.g., 1.2k, 1.5m)
const formatNumber = (value?: number): string => {
  if (!value) return '0';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toString();
};

// Fetch data from API using axios
const fetchchannelData = async (): Promise<void> => {
  try {
    const url = `https://yt-api.p.rapidapi.com/channel/videos?id=${channelID.value}`;
    const response = await axios.get(url, apiConfig);
    const result: channelDataInterface = response.data;

    if (result?.data) {
      channelData.value = result;
    } else {
      console.error('API returned no data');
    }
  } catch (error) {
    console.error('Error fetching channel data:', error);
  } finally {
    loading.value = false;
  }
};

// Navigate to all channel videos
const gotoChannelVideos = (): void => {
  router.push({ name: 'ChannelVideos', params: { id: channelID.value } });
};

// Fetch channel data on mount
onMounted(fetchchannelData);
</script>

<style scoped>
.banner {
  background-color: #333; /* Fallback for missing images */
}
</style>
