<template>
    <div class="relative">
      <div class="rounded-lg bg-black m-2 "
           :class ="[
             show ? 'absolute z-30 transition ease-in-out delay-150 hover:translate-y-8 hover:scale-125 hover:bg-[#202020] duration-300' : ''
           ]">
  
        <div class="" @mouseover="show = true" @mouseleave="show = false; showVideo = false">
          <img :src="thumbnail || ''"
               class="aspect-video cursor-pointer mr-3 w-[100%]"
               :class="show ? 'transition ease-in-out delay-150 rounded-l-lg' : 'rounded-lg', showVideo ? 'delay-350 hidden' : ''"
               alt="" >
  
          <div class="w-full h-full aspect-video cursor-pointer" :class="showVideo ? 'delay-350 ' : 'hidden'">
            <video ref="video" :src="videoUrl || ''" type="video/mp4"></video>
          </div>
        </div>
  
        <div class="">
          <div class="flex mt-2.5">
            <div class="">
              <img class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8"
                   :src="image || ''"
                   alt="">
            </div>
            <div class="px-1.5 text-white mt-1">
              <div class="text-[17px] font-semibold  w-full cursor-pointer">
                {{ (title || '').substring(0, 20) }}
              </div>
              <div class="text-[14px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                {{ (user || '').substring(0, 30) }}
                <CheckCircle fillColor="#888888" :size="17" />
              </div>
              <div class="text-s mb-1 text-gray-700 cursor-pointer">{{ views || '' }}</div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
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
      thumbnail: { type: String, default: '' }
    },
    setup(props) {
      const { title, user, views, image, videoUrl, thumbnail } = toRefs(props);
      const show = ref(false);
      const showVideo = ref(false);
      const video = ref(null);
  
      watch(() => show.value, (isShown) => {
        if (isShown) {
          showVideo.value = true;
          video.value.play();
        } else {
          showVideo.value = false;
          video.value.pause();
          video.value.currentTime = 0;
        }
      });
  
      return {
        show,
        showVideo,
        title,
        user,
        views,
        image,
        videoUrl,
        thumbnail,
        video
      };
    }
  };
  </script>
  
  <style >
  /* Add your styles here */
  </style>
  