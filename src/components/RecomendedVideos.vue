<template>
  <div class="flex flex-col lg:flex-row md:gap-3 sm:items-start">
    <div
      class="relative lg:w-1/2 w-full"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <img
        :src="vid.thumbnail || ''"
        class="aspect-video cursor-pointer rounded-lg sm:w-full"
        alt="Video Thumbnail"
      />

      <!-- Video container for hover effect -->
      <div
        v-if="show"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      >
        <video
          ref="video"
          class="lg:w-full w-[340px] aspect-video"
          :src="vid.videoUrl || ''"
          type="video/mp4"
          autoplay
        ></video>
      </div>
    </div>

    <div class="px-3 mt-2 sm:mt-0 sm:w-1/2 text-white">
      <div class="text-[15px] pb-1.5 font-bold w-full cursor-pointer">
        {{ (vid.title || '').substring(0, 50) }}
      </div>
      <div class="text-[14px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
        {{ (vid.user || '').substring(0, 30) }}
        <CheckCircle fillColor="#888888" :size="17" />
      </div>
      <div class="text-sm mb-1 text-gray-700 cursor-pointer">
        {{ vid.views || '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

const props = defineProps({
  vid: {
    type: Object,
    required: true,
  },
});

const show = ref(false);
const video = ref<HTMLVideoElement | null>(null);

// Watcher to handle video playback based on hover state
watch(show, (isShown) => {
  if (video.value) {
    if (isShown) {
      video.value.play();
    } else {
      video.value.pause();
      video.value.currentTime = 0;
    }
  }
});
</script>

<style lang="scss" scoped>
/* Add your styles here if needed */
</style>
