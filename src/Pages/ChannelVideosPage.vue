<template>
  <NavLayout>
    <!-- Banner Section -->
    <div
      class="banner h-36 md:h-48 lg:h-60 bg-cover bg-center relative"
      :style="{ backgroundImage: 'url(https://yt3.googleusercontent.com/8mCxFaL_cBotHhN4ItCylQ4G0ExhO3HsdGMZK7OprAU_HCovOQoeCqEqw31IvSBWiAxWA1EFbW0=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)' }"
    >
      <!-- Overlay for Banner -->
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Loading Text -->
    <div v-if="loading" class="flex justify-center items-center h-96 text-white text-2xl">
      Loading, please wait...
    </div>

    <!-- Profile Section -->
    <div v-if="!loading" class="flex items-center px-6 pt-6">
      <img
        :src="ChannelData.meta.avatar[0].url"
        alt="Profile"
        class="w-32 h-32 rounded-full border-4 border-gray-800"
      />
      <div class="ml-6">
        <h1 class="text-3xl font-semibold text-white">{{ ChannelData.meta.title || ' ' }}</h1>
        <p class="text-gray-700 text-lg">{{ ChannelData.meta.subscriberCountText }} subscribers</p>
        <a
          href="https://instagram.com/lakshayonly"
          class="text-blue-500 hover:underline mt-1 text-lg"
        >
          {{ ChannelData.meta.channelHandle }}
        </a>
      </div>
      <button class="ml-auto bg-red-500 hover:bg-red-600 rounded-2xl text-white font-semibold px-6 py-3">
        Subscribe
      </button>
    </div>

    <!-- Latest Video Section -->
    <div v-if="!loading" class="p-2">
      <h2 class="text-2xl font-semibold mt-8 pl-5 text-white">Latest Video</h2>
      <div class="flex flex-col gap-7">

        <VideoPreview
          v-for="(video,index) in ChannelData.data"
          :thumbnail="video.thumbnail[0].url"
          :title="video.title"
          :channelName="video.meta.title"
          :views="formatNumber(video.viewCount)"
          :uploadTime="video.publishedTimeText"
          duration="13:02"
          isVerified
          description="My11Circle App: https://bit.ly/3MfaJn0 Use my exclusive coupon: YT2022 to get additional 20% extra cash on first deposit..."
        />

      </div>
    </div>

    <!-- More Content -->
    <div v-if="!loading" class="w-full flex items-center justify-between pr-5">
      <h2 class="text-2xl font-semibold mt-8 pl-5 text-white">Latest Videos</h2>
      <p class="text-white" @click="gotoChannelvideos()">See more</p>
    </div>

    <!-- Video Cards -->
    <!-- <div v-if="!loading" class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 mr-3.5 pt-4">
      <VideoCard
        v-for="(video, index) in ChannelData.data"
        :key="index"
        :title="video.title"
        :user="video.channelTitle"
        :views="video.viewCount + ' - ' + video.publishedTimeText"
        :thumbnail="video.thumbnail[0].url"
        :videoUrl="video.videoUrl"
        @click="goToVideo(video.videoId)"
      />
    </div> -->
  </NavLayout>
</template>

<script setup>
import VideoPreview from '../components/VideoPreview.vue';
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const channelID = ref(route.params.id);
const ChannelData = ref({});
const loading = ref(true);

// Format view count for display (k, m, etc.)
function formatNumber(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return value.toString();
  }
}

// Fetch channel and video data
const url = `https://yt-api.p.rapidapi.com/channel/videos?id=${channelID.value}`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
    'x-rapidapi-host': 'yt-api.p.rapidapi.com',
  },
};

// Fetch data from the API
async function fetchData() {
  try {
    console.log('calling API...');
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('API response:', result.avatar);
    if (result && result.data) {
      ChannelData.value = result; // Store data in ChannelData
    } else {
      console.error('No data found in the response');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false; // Hide the loader when data is fetched
  }
}

// Ensure the API call is made after the component is mounted
onMounted(() => {
  fetchData(); // Call the fetchData function after the component is mounted
});

// Navigate to the video details page
function goToVideo(videoId) {
  router.push({ name: 'Video', params: { id: videoId } });
}

// Navigate to the channel videos page
function gotoChannelvideos() {
  router.push({ name: 'ChannelVideos', params: { id: channelID.value } });
}
</script>

<style lang="scss" scoped>
/* Add any specific styles here */
</style>
