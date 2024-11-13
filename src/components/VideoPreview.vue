<template>
  <div class="video-preview w-[100%] flex flex-col md:flex-row p-4 border-b border-gray-700 hover:bg-gray-800 transition duration-200">
    <!-- Thumbnail Section -->
    <div class="thumbnail relative w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
      <img :src="thumbnail" alt="Video Thumbnail" class="w-full h-full object-cover rounded-md aspect-[16/9]" />
      <span class="duration absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs font-semibold px-1 py-0.5 rounded">
        {{ duration }}
      </span>
    </div>

    <!-- Video Details Section -->
    <div class="details mt-3 md:mt-0 md:ml-4 flex-1">
      <h3 class="title text-lg font-semibold text-white truncate">{{ title }}</h3>
      <p class="channel-name text-sm text-gray-500 mt-1">
        {{ channelName }}
        <span class="verified-badge text-blue-500" v-if="isVerified">✔</span>
      </p>
      <p class="views text-sm text-gray-400 mt-1">{{ views }} • {{ uploadTime }}</p>
      <p class="description text-sm text-gray-400 mt-2 overflow-hidden overflow-ellipsis line-clamp-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    views: {
      type: String,
      required: true,
    },
    uploadTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "13:02",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>
