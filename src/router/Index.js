import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../Pages/HomePage.vue';
import Video from '../Pages/Video.vue';

import ChannelHome from '../Pages/ChannelHome.vue';

import Search from '../Pages/Search.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
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

  
  
  // {
  //   path: '/channel/videos/:id',
  //   name: 'ChannelVideos',
  //   component: ChannelVideosPage,
  // },
  {
    path: '/search/:query',
    name: 'Search',
    component: Search,
  }

];

const router = createRouter({
  history: createWebHistory('/'), // or createWebHistory(process.env.BASE_URL) if env variables are configured
  routes,
});

export default router;
