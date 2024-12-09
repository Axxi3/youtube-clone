<template>
  <div class="relative">
    <div
      class="rounded-lg bg-black m-2"
      :class="[show ? 'absolute z-30 transition ease-in-out delay-150 duration-300' : '']"
    >
      <div>
        <img
          :src="thumbnail || ''"
          class="aspect-video cursor-pointer mr-3 w-[100%]"
          :class="show ? 'transition ease-in-out delay-150 rounded-l-lg' : 'rounded-lg', showVideo ? 'delay-350 hidden' : ''"
          alt=""
        />
      </div>

      <div>
        <div class="flex mt-2.5">
          <div>
            <img
              class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8"
              :src="image || ''"
              alt=""
            />
          </div>
          <div class="px-1.5 text-white mt-1">
            <div class="flex">
              <div class="text-[17px] font-semibold w-full cursor-pointer">
              {{ (title || '').substring(0, 20) }}
            </div>
            
            </div>
            <div class="text-s mb-1 text-white cursor-pointer">{{ user.substring(0, 16) || '' }}</div>
            <div class="text-s mb-1 text-white cursor-pointer">{{ views || '' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineProps, toRefs, ref, watch } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

export default {
  components: { CheckCircle },
  props: {
    title: { type: String, default: '' },
    user: { type: String, default: '' },
    views: { type: String, default: '' },
    image: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    channelTitle: { type: String, default: '' },
  },
  setup(props) {
    // Destructure props
    const { title, user, views, image, videoUrl, thumbnail } = toRefs(props);

    // Reactive states
    const show = ref(false);
    const showVideo = ref(false);
    const video = ref<HTMLVideoElement | null>(null);

    // Watch for changes in show and handle video play/pause
    watch(
      () => show.value,
      (isShown) => {
        if (isShown && video.value) {
          showVideo.value = true;
          video.value.play();
        } else if (video.value) {
          showVideo.value = false;
          video.value.pause();
          video.value.currentTime = 0;
        }
      }
    );

    return {
      show,
      showVideo,
      title,
      user,
      views,
      image,
      videoUrl,
      thumbnail,
      video,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
