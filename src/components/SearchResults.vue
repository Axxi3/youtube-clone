<template>
  <div class="flex flex-col md:flex-row items-start gap-4 p-4 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <!-- Thumbnail -->
    <div class="w-full md:w-1/3">
      <img
        :src="video.thumbnail[0].url"
        alt="Thumbnail"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>

    <!-- Video Details -->
    <div class="flex-1 flex flex-col justify-between">
      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-200 hover:text-blue-400 cursor-pointer">
        {{ video.title }}
      </h3>

      <!-- Channel and Views -->
      <div class="text-sm text-gray-400 mt-2">
        <p>{{ video.channelTitle }}</p>
        <p>{{ formatNumber(video.viewCount) }} - {{ video.publishedTimeText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Props
defineProps<{
  video: {
    title: string;
    thumbnail: { url: string }[];
    channelTitle: string;
    viewCount: number | null;
    publishedTimeText: string;
  };
}>();

// Helper function to format numbers
const formatNumber = (value: number | null): string => {
  if (value == null) return 'N/A'; // Return 'N/A' if value is null
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return value.toString(); // Return the value as a string for smaller numbers
};
</script>

<style scoped>
/* Custom styles (optional) */
</style>
