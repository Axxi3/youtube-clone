<template>
  <div v-if="loading">
    <div class="w-[90vw] h-[90vh] flex items-center justify-center">
      <img :src="loader" alt="Loading" sizes="30" />
    </div>
  </div>

  <div v-else>
    <NavLayout>
      <div class="xl:flex">
        <div class="p-3 lg:w-[65%] w-full">
          <iframe
            :src="PlayLink"
            class="w-full h-[300px] md:h-[400px] lg:h-[560px] xl:h-[500px] 2xl:h-[600px]"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <div class="text-white text-2xl font-bold mt-4">
            {{ videoData.title }}
          </div>

          <div @click="gotoChannelHome(videoData.channelId)" class="flex items-center mb-4">
            <img
              class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8"
              :src="'https://picsum.photos/id/' + (Math.random() * 100).toFixed(0) + '/100'"
              alt="Channel Image"
            />
            <div class="pl-2 text-white mt-1">
              <div class="text-white text-lg font-bold flex items-center cursor-pointer">
                {{ videoData.channelTitle }}
                <CheckCircle fillColor="#888888" :size="17" />
              </div>
              <div class="text-sm mb-1 text-gray-400 font-bold">
                <span>{{ generateRandomSubscribers() }} subscribers</span>
              </div>
            </div>
          </div>

          <div class="bg-[#3f3f3f] rounded-lg w-full p-3 text-white">
            <div class="text-white text-lg font-extrabold">1k views - 3 days ago</div>
            <div class="text-sm font-regular">
              {{ videoData.description }}
            </div>
          </div>

          <div class="mt-6">
            <div class="text-white text-lg font-extrabold">
              {{ comments.commentsCount + ' comments' }}
            </div>
            <div v-for="(com, index) in comments.data" :key="index">
              <div class="flex items-start mb-4 mt-2">
                <img
                  class="rounded-full mt-2 w-12 h-12"
                  :src="'https://picsum.photos/id/' + (Math.random() * 100).toFixed(0) + '/100'"
                  alt="Comment Author Image"
                />
                <div class="pl-6 mt-1">
                  <div class="text-white font-bold flex items-baseline">
                    <div>{{ com.authorText }}</div>
                    <div class="text-gray-400 pl-3">{{ com.publishedTimeText }}</div>
                  </div>
                  <div class="text-gray-200 text-sm font-semibold">
                    {{ com.textDisplay }}
                  </div>
                  <div class="mt-4 flex items-center">
                    <ThumbUpOutline fillColor="#FFFFFF" :size="20" class="pr-2" />
                    <div class="text-gray-400 text-sm font-bold pr-10">{{ com.likesCount }}</div>
                    <ThumbDownOutline fillColor="#FFFFFF" :size="20" class="pr-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[35%] xl:flex flex-col gap-3 p-3 sm:block">
          <RecomendedVideos
            v-for="(video, index) in RecomData"
            :key="index"
            :vid="{
              title: video.title,
              thumbnail: video.thumbnail?.[0].url,
              user: video.channelTitle,
              views: '12k views - 3 days ago',
            }"
            @click="goToVideo(video.videoId)"
          />
        </div>
      </div>
    </NavLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RecomendedVideos from '../components/RecomendedVideos.vue';
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { apiConfig } from '../Services/Config';

const route = useRoute();
const router = useRouter();
const videoId = ref<string>(route.params.id as string);
const loading = ref<boolean>(true);
const videoData = ref<any>({});
const RecomData = ref<any[]>([]);
const comments = ref<any>({ data: [], commentsCount: 0 });
const subscribers = ref<string>('Loading...');

const PlayLink = `https://www.youtube.com/embed/${videoId.value}?autoplay=1`;

const apiHeaders = apiConfig

const fetchVideoData = async () => {
  try {
    const response = await axios.get(`https://yt-api.p.rapidapi.com/video/info?id=${videoId.value}`, 
      apiHeaders,
    );
    videoData.value = response.data;
  } catch (error) {
    console.error('Error fetching video data:', error);
  }
};

const fetchRecommendedVideos = async () => {
  try {
    const response = await axios.get(`https://yt-api.p.rapidapi.com/related?id=${videoId.value}`,apiHeaders);
    RecomData.value = response.data.data || [];
  } catch (error) {
    console.error('Error fetching recommended videos:', error);
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get(`https://yt-api.p.rapidapi.com/comments?id=${videoId.value}`,apiHeaders);
    comments.value = response.data || { data: [], commentsCount: 0 };
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};



watch(() => route.params.id, async (newId) => {
  videoId.value = newId as string;
  loading.value = true;
  await Promise.all([
    fetchVideoData(),
    fetchRecommendedVideos(),
    fetchComments(),
  ]);
  loading.value = false;
});

onMounted(async () => {
  await Promise.all([
    fetchVideoData(),
    fetchRecommendedVideos(),
    fetchComments(),
  ]);
  loading.value = false;
});

const goToVideo = (id: string) => {
  router.push({ name: 'Video', params: { id } });
};

const gotoChannelHome = (id: string) => {
  router.push({ name: 'Channel', params: { id } });
};

const generateRandomSubscribers = (): string => {
  // Generate a random number between 10,000 and 1,000,000
  const randomNumber = Math.floor(Math.random() * (1_000_000 - 10_000 + 1)) + 10_000;

  // Convert the number to a short format (e.g., 1000 -> "1K", 1000000 -> "1M")
  if (randomNumber >= 1_000_000) {
    return `${(randomNumber / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  } else if (randomNumber >= 1_000) {
    return `${(randomNumber / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  } else {
    return randomNumber.toString(); // For numbers below 1K (unlikely in this case)
  }
};
</script>

<style scoped>
/* Add any required scoped styles here */
</style>
