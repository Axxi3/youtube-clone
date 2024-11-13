import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../Pages/HomePage.vue';
import Video from '../Pages/Video.vue';
import Trending from '../Pages/Trending.vue';
import ChannelHome from '../Pages/ChannelHome.vue';
import ChannelVideosPage from '../Pages/ChannelVideosPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/trending',
    name:"Trending",
    component:Trending,
  },
  {
    path: '/:id',
    name: 'Video',
    component: Video,
  },
  {
    path: '/channel/:id',
    name: 'Channel',
    component: ChannelHome,
  },
  {
    path: '/channel/videos/:id',
    name: 'ChannelVideos',
    component: ChannelVideosPage,
  },

];

const router = createRouter({
  history: createWebHistory('/'), // or createWebHistory(process.env.BASE_URL) if env variables are configured
  routes,
});

export default router;
