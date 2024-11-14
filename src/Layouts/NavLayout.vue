<template>
    <div class="relative top-0">
        <div class="w-[100%] h-[60px] top-0  fixed bg-black z-20 flex items-center justify-between" id="TopNav ">
            <div class="flex items-center">
                <button class="p-2 ml-3 rounded-full hover:bg-gray-500  cursor-pointer block"
                @click="openSideNav = !openSideNav">
                    <MenuIcon fillColor="#FFFFFF" :size="26"/>
                </button>
                <div class="mx-2"></div>
                <div class="flex items-center justify-center text-white mr-10 cursor-pointer">
                    <img width="32" src="/src/assets/YT-logo.png" alt="YouTube Logo">
                    <img width="62" src="/src/assets/YT-logo-text.png" alt="YouTube Logo Text">
                </div>
            </div>


            <div class="w-[600px]  md:block hidden">
                <div class="rounded-full flex items-center bg-[#222222]">
                    <input
                    type="text"
                    class="form-control block w-full text-gray-200 px-5 py-1.5 text-base font-normal bg-black placeholder-gray-400
                    bg-clip-padding border border-solid border-l-gray-400 border-y-gray-700 rounded-l-full transition ease-in-out m-0 border-transparent
                    focus:ring-0 "
                    />
                    <MagnifyIcon class="mx-6" fillColor="#FFFFFF" :size="23"/>
                </div>
            </div>

            <div >
                <img src="https://yt3.ggpht.com/8zxIp2WMba0RlbAvgoLS4Sdm5YYIOM8wm9Pnt4YOJbk0tUDwu613wpRxQGcu70BC73wfAdRTjA=s88-c-k-c0x00ffffff-no-rj" class="rounded-full mx-8" width="35" alt="">
            </div>
        </div>
        <div
  class="h-[100%] fixed z-0 bg-black"
  id="SideNav"
  :class="[
    !openSideNav ? 'w-[70px]' : 'w-[240px]',
    'hidden sm:block' // This hides on mobile and shows on small screens (640px and up)
  ]"
>
  <!-- Side Navigation Content -->

            <ul class="mt-[60px] w-full" :class = "[!openSideNav ? 'p-2' :'px-5 pb-2 pt-[7px]']">
        <SideNavItems :openSideNav="openSideNav" iconString="Home" />
        <SideNavItems :openSideNav="openSideNav" iconString="Trending" />
        <SideNavItems :openSideNav="openSideNav" iconString="Gaming" />
        <SideNavItems :openSideNav="openSideNav" iconString="Music" />
        <SideNavItems :openSideNav="openSideNav" iconString="News" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <SideNavItems :openSideNav="openSideNav" iconString="Subscriptions" />
        <SideNavItems :openSideNav="openSideNav" iconString="Liked" />
        <SideNavItems :openSideNav="openSideNav" iconString="Watch Later" />
        <div class="" v-if="openSideNav">
            <div class="border-b border-b-gray-700 my-2.5"></div>
            <div class="text-gray-400 text-[14px] text-extrabold">
            About Press Copyright
            <div>Contact Us</div>
            Creator Advertise Developers
        </div>
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <div class="text-gray-400 text-[14px] text-extrabold">
            Terms Privacy Policy & Safety
            <div>How Youtube Works</div>
            <span>Test Now features</span>
        </div>
        </div>
        
    </ul>
        </div>

        <div
      v-if="isMobile && openSideNav"
      class="fixed inset-0 z-40 bg-black w-[240px] top-[55px] h-full transition-transform duration-300"
    >
      <ul class="mt-[60px] w-full px-5 pb-2 pt-[7px]">
        <SideNavItems :openSideNav="openSideNav" iconString="Home" />
        <SideNavItems :openSideNav="openSideNav" iconString="Trending" />
        <SideNavItems :openSideNav="openSideNav" iconString="Gaming" />
        <SideNavItems :openSideNav="openSideNav" iconString="Music" />
        <SideNavItems :openSideNav="openSideNav" iconString="News" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <SideNavItems :openSideNav="openSideNav" iconString="Subscriptions" />
        <SideNavItems :openSideNav="openSideNav" iconString="Liked" />
        <SideNavItems :openSideNav="openSideNav" iconString="Watch Later" />
        <div v-if="openSideNav" class="text-gray-400 text-[14px] font-extrabold mt-2">
          <div>About Press Copyright</div>
          <div>Contact Us</div>
          <div>Creator Advertise Developers</div>
        </div>
        <div v-if="openSideNav" class="border-b border-b-gray-700 my-2.5"></div>
        <div v-if="openSideNav" class="text-gray-400 text-[14px] font-extrabold">
          <div>Terms Privacy Policy & Safety</div>
          <div>How YouTube Works</div>
          <span>Test New features</span>
        </div>
      </ul>
    </div>

        <div
        v-if="!isMobile"
        :style="{
    width:  (openSideNav ? 'calc(100% - 240px)' : 'calc(100% - 70px)')
  }"
    class="h-[calc(100vh-60px)] absolute right-0 top-[35px]"
>
    <slot></slot>  
</div>

<div
       v-else
        
    class="h-[calc(100vh-60px)] absolute right-0 top-[30px] w-full"
>
    <slot></slot>  
</div>
<!-- fix the navabr im mobole -->
    </div>
</template>

<script setup>
import MenuIcon from "vue-material-design-icons/Menu.vue"
import MagnifyIcon from "vue-material-design-icons/Magnify.vue"

import SideNavItems from "../components/SideNavItems.vue";


import { defineProps, toRefs,ref, computed } from 'vue';

const isMobile = computed(() => window.innerWidth <640); 
console.log("is this mobile" + isMobile.value)
let openSideNav = ref(false);

</script>

<style scoped>

</style>