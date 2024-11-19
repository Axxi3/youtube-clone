<template>
    <li
      :class="[!openSideNav ? 'p-2' : 'flex items-center p-2']"
      class="text-white text-sm font-semibold text-center hover:bg-gray-700 rounded-lg cursor-pointer"
      @click="navigateToPath"
    >
      <div :class="[!openSideNav ? 'w-full flex justify-center' : '']">
        <component :is="icon" />
      </div>
      <div :class="[!openSideNav ? '' : 'mt-1 ml-4']">
        <span v-if="!openSideNav">{{ iconString.substring(0, 4) }}</span>
        <span v-else>{{ iconString }}</span>
      </div>
    </li>
  </template>
  
  <script setup lang="ts">
  import { defineProps, toRefs, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Import icons
  import Home from 'vue-material-design-icons/Home.vue';
  import FolderPlayOutline from 'vue-material-design-icons/FolderPlayOutline.vue';
  import ImageMultiple from 'vue-material-design-icons/ImageMultiple.vue';
  import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
  import History from 'vue-material-design-icons/History.vue';
  import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
  import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
  import GamingIcon from 'vue-material-design-icons/Gamepad.vue';
  import MusicIcon from 'vue-material-design-icons/Music.vue';
  import NewsIcon from 'vue-material-design-icons/Newspaper.vue';
  
  // Define props with TypeScript
  const props = defineProps<{
    openSideNav: boolean;
    iconString: string;
  }>();
  
  const { openSideNav, iconString } = toRefs(props);
  const router = useRouter();
  
  // Compute the icon based on iconString
  const icon = computed(() => {
    switch (iconString.value) {
      case 'Home':
        return Home;
      case 'Subscriptions':
        return FolderPlayOutline;
      case 'Library':
        return ImageMultiple;
      case 'Liked':
        return ThumbUpOutline;
      case 'History':
        return History;
      case 'Watch Later':
        return ClockOutline;
      case 'Trending':
        return TrendingUp;
      case 'Gaming':
        return GamingIcon;
      case 'Music':
        return MusicIcon;
      case 'News':
        return NewsIcon;
      default:
        return null;
    }
  });
  
  // Navigate to a path
  const navigateToPath = (): void => {
    let path = '/';
    switch (iconString.value) {
      case 'Home':
        path = '/';
        break;
      case 'Trending':
        path = '/';
        break;
      case 'Subscriptions':
        path = '/';
        break;
      case 'Library':
        path = '/';
        break;
      case 'Liked':
        path = '/';
        break;
      case 'History':
        path = '/';
        break;
      case 'Watch Later':
        path = '/';
        break;
      case 'Gaming':
        path = '/';
        break;
      case 'Music':
        path = '/';
        break;
      case 'News':
        path = '/';
        break;
      default:
        path = '/';
        break;
    }
    router.push(path);
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  