<template>
    <div v-if="loading">
     <div class="w-[90vw] h-[90vh] flex items-center justify-center">
      <img :src="loader" alt="" sizes="30">
     </div> <!-- You can replace this with a spinner component if needed -->
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
  
            <div
             @click="gotoChannelHome(videoData.channelId)"
            class="flex items-center mb-4" id="Channel Name">
              <img class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8"
                :src="'https://picsum.photos/id/' + (Math.random() * 100).toFixed(0)+ '/100'"
                alt=""
              />
              <div class="pl-2 text-white mt-1">
                <div 
               
                class="t text-white text-lg font-bold flex items-center cursor-pointer">
                  {{ videoData.channelTitle }}
                  <CheckCircle fillColor="#888888" :size="17" />
                </div>
                <div class="text-sm mb-1 text-gray-400 font-bold cursor-pointer">1k views - 3 days ago</div>
              </div>
            </div>
                  
            <div class="bg-[#3f3f3f] rounded-lg w-full p-3 text-white" id="Comment Section">
              <div class="text-white text-lg font-extrabold">1k views - 3 days ago</div>
              <div class="text-sm font-regular">
                {{ videoData.description }}
              </div>
            </div>
  
            <div class="mt-6">
              <div class="text-white text-lg font-extrabold"> {{ comments.commentsCount + " comments" }}</div>
              <div class="" v-for="(com,index) in comments.data">
                <div class="flex items-flex mb-4 mt-2">
                <img class="rounded-full mt-2 w-12 h-12"
                  :src="'https://picsum.photos/id/' + (Math.random() * 100).toFixed(0) + '/100'"
                  alt=""
                />
                <div class="pl-6 mt-1">
                  <div class="text-white font-bold flex items-baseline">
                    <div class="">{{ com.authorText }}</div>
                    <div class="text-gray-400 pl-3">
                      {{ com.publishedTimeText }}
                    </div>
                  </div>
  
                  <div class="text-gray-200 text-sm font-semibold">
                    {{ com.textDisplay }}
                  </div>
                  <div class="mt-4 flex items-center">
                    <ThumbUpOutline fillColor="#FFFFFF" :size="20" class="pr-2"/>
                    <div class="text-gray-400 text-sm font-bold pr-10">
                      {{ com.likesCount }}
                    </div>
                    <ThumbDownOutline fillColor="#FFFFFF" :size="20" class="pr-2"/>
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
  
  <script setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import RecomendedVideos from '../components/RecomendedVideos.vue';
  import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue'
   import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
    import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue'
    import loader from "../assets/loader.gif"
  
  const route = useRoute();
  const router = useRouter();
  const videoId = ref(route.params.id);
  const loading = ref(true);  // Add loading state
  
  const videoData = ref({});  // Initialize videoData as an empty object
  const RecomData = ref([]); // Reactive video data
  
  const PlayLink = `https://www.youtube.com/embed/${videoId.value}?autoplay=1`;
  
  const url = `https://yt-api.p.rapidapi.com/video/info?id=${videoId.value}`;
  const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
    }
  };
  
  // Fetch video data when the component is mounted
  async function fetchVideoData() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      videoData.value = result;  // Store the entire response in videoData
      console.log("Video data fetched:", result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      loading.value = false;
    }
  }
  
  // Fetch recommended videos data
  async function fetchData() {
    const Recomurl = `https://yt-api.p.rapidapi.com/related?id=${videoId.value}`;
    const Recomoptions = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
      }
    };
    
    try {
      const response = await fetch(Recomurl, Recomoptions);
      const result2 = await response.json();
      RecomData.value = result2.data;
     
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }

    
  }



let comments= ref([])
  async function fetchComments() {
   const CommentsURL =`https://yt-api.p.rapidapi.com/comments?id=${videoId.value}`
    const Recomoptions = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
      }
    };
    
    try {
      const response = await fetch(CommentsURL, Recomoptions);
      const result2 = await response.json();
      RecomData.value = result2.data;
      comments = result2
      console.log( comments);
      
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  }



  
  // Watch for changes in the route parameter (videoId)
  watch(() => route.params.id, (newId) => {
    videoId.value = newId;
    fetchVideoData();  // Re-fetch video data
    fetchData();  // Re-fetch recommended videos
  });
  
  // Fetch initial data
  onMounted(fetchVideoData);
  onMounted(fetchData);
  onMounted(fetchComments)
  
  
  // Go to the selected video and update the route
  function goToVideo(videoId) {
    router.push({ name: 'Video', params: { id: videoId } });
  }

  function gotoChannelHome(id){
  console.log(id);
 
  router.push({ name: 'Channel', params: { id: id } });  // Use 'id' passed as argument
}
  </script>
  
  <style  scoped>
  /* Add any required scoped styles here */
  </style>
  