<template>
  <NavLayout class="container">
    <div class="flex flex-col gap-5">
      <!-- Render video cards dynamically -->
      
      <SearchResults
        v-for="(video, index) in videoData"
        :key="index"
        :video="video"
        @click = "gotovideo(video.videoId)"
      />

      <!-- {
    title: 'INDIA TESTS FIRST EVER HYPERSONIC MISSILE!!',
    thumbnail:
      'https://i.ytimg.com/vi/2oRlBmwKzy4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD64dLQTfS4TOogwbb_VJfLu4lJxQ',
    channel: 'StudyIQ IAS',
    views: '259K views',
    time: '2 hours ago',
    likes: '24.6K',
    engagementRate: '13',
    tags: ['Hypersonic', 'Missile', 'India', 'News'],
  }, -->

    </div>
  </NavLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'; // Import ref for reactive data
import SearchResults from '../components/SearchResults.vue';
import NavLayout from '../Layouts/NavLayout.vue';
import { useRoute, useRouter } from 'vue-router';

// Reactive videos array
const videos = ref([
  {
    title: 'INDIA TESTS FIRST EVER HYPERSONIC MISSILE!!',
    thumbnail:
      'https://i.ytimg.com/vi/2oRlBmwKzy4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD64dLQTfS4TOogwbb_VJfLu4lJxQ',
    channel: 'StudyIQ IAS',
    views: '259K views',
    time: '2 hours ago',
    likes: '24.6K',
    engagementRate: '13',
    tags: ['Hypersonic', 'Missile', 'India', 'News'],
  },
  {
    title: 'Understanding Quantum Computing: The Future of Technology',
    thumbnail:
      'https://i.ytimg.com/vi/QNmv-gdwCcg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCuYc1fIcbrFbY6zx5RjM9JG2NKAQ',
    channel: 'TechWorld',
    views: '120K views',
    time: '1 day ago',
    likes: '15K',
    engagementRate: '9',
    tags: ['Quantum Computing', 'Technology', 'Future'],
  },
  {
    title: 'How to Cook the Perfect Steak | Gordon Ramsay',
    thumbnail:
      'https://i.ytimg.com/vi/rnVozGux8Ks/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDnYJfdvJMOGLkVn-yBFWCGYyHvVw',
    channel: 'Gordon Ramsay',
    views: '3.5M views',
    time: '1 week ago',
    likes: '500K',
    engagementRate: '17',
    tags: ['Cooking', 'Steak', 'Food'],
  },
  {
    title: 'The Science of Black Holes Explained',
    thumbnail:
      'https://i.ytimg.com/vi/U8M-YSKqVdk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCm9HUfiEd7_7PT5TV4IZSbB5Cxcw',
    channel: 'AstroExplained',
    views: '980K views',
    time: '3 days ago',
    likes: '76K',
    engagementRate: '11',
    tags: ['Space', 'Black Holes', 'Science'],
  },
]);

const route = useRoute();

  const query = ref(route.params.query);
  const videoData = ref([]);
  const router = useRouter()

const url = `https://yt-api.p.rapidapi.com/search?query=${query.value}`;
const options = {
	method: 'GET',
	headers: {
		  'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com',
	}
};

function gotovideo(id){
  router.push({ name: 'Video', params: { id: id } });
}

async function fetchData() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log("API response:", result.data); // Log full API response to inspect its structure

		// Filter only objects with type "video"
		videoData.value = (result.data || []).filter(item => item.type === "video");
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

onMounted(fetchData)


</script>
