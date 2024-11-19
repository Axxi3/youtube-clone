<template>
  <div class="relative top-0">
      <div class="w-[100%] h-[60px] top-0  fixed bg-black z-20 flex items-center justify-between" id="TopNav ">
          <div class="flex items-center">
              <button class="p-2 ml-3 rounded-full hover:bg-gray-500 cursor-pointer block" @click="toggleSideNav">
                  <MenuIcon fillColor="#FFFFFF" :size="26"/>
              </button>
              <div class="mx-2"></div>
              <div class="flex items-center justify-center text-white mr-10 cursor-pointer">
                  <img width="32" src="/src/assets/YT-logo.png" alt="YouTube Logo">
                  <img width="62" src="/src/assets/YT-logo-text.png" alt="YouTube Logo Text">
              </div>
          </div>

          <div class="w-[600px] md:block hidden">
              <div class="rounded-full flex items-center bg-[#222222]">
                  <!-- Input Field -->
                  <input
                      type="text"
                      v-model="searchText"
                      class="form-control block w-full text-gray-200 px-5 py-1.5 text-base font-normal bg-black placeholder-gray-400
                      bg-clip-padding border border-solid border-l-gray-400 border-y-gray-700 rounded-l-full transition ease-in-out m-0 border-transparent
                      focus:ring-0"
                      placeholder="Type here..."
                  />

                  <!-- Magnify Icon as Button -->
                  <div @click="handleSearch" class="mx-6 cursor-pointer flex items-center justify-center">
                      <MagnifyIcon fillColor="#FFFFFF" :size="23" />
                  </div>
              </div>
          </div>

          <div>
              <img src="https://yt3.ggpht.com/8zxIp2WMba0RlbAvgoLS4Sdm5YYIOM8wm9Pnt4YOJbk0tUDwu613wpRxQGcu70BC73wfAdRTjA=s88-c-k-c0x00ffffff-no-rj" class="rounded-full mx-8" width="35" alt="">
          </div>
      </div>

      <div
          class="h-[100%] fixed z-0 bg-black"
          id="SideNav"
          :class="[!openSideNav ? 'w-[70px]' : 'w-[240px]', 'hidden sm:block']"
      >
          <!-- Side Navigation Content -->
          <ul class="sm:mt-[60px] mt-[30px] w-full" :class="[!openSideNav ? 'p-2' : 'px-5 pb-2 pt-[7px]']">
              <SideNavItems :openSideNav="openSideNav" iconString="Home" />
              <SideNavItems :openSideNav="openSideNav" iconString="Trending" />
              <SideNavItems :openSideNav="openSideNav" iconString="Gaming" />
              <SideNavItems :openSideNav="openSideNav" iconString="Music" />
              <SideNavItems :openSideNav="openSideNav" iconString="News" />
              <div class="border-b border-b-gray-700 my-2.5"></div>
              <SideNavItems :openSideNav="openSideNav" iconString="Subscriptions" />
              <SideNavItems :openSideNav="openSideNav" iconString="Liked" />
              <SideNavItems :openSideNav="openSideNav" iconString="Watch Later" />
              <div v-if="openSideNav">
                  <div class="border-b border-b-gray-700 my-2.5"></div>
                  <div class="text-gray-400 text-[14px] text-extrabold">
                      About Press Copyright
                      <div>Contact Us</div>
                      Creator Advertise Developers
                  </div>
                  <div class="border-b border-b-gray-700 my-2.5"></div>
                  <div class="text-gray-400 text-[14px] text-extrabold">
                      Terms Privacy Policy & Safety
                      <div>How YouTube Works</div>
                      <span>Test New Features</span>
                  </div>
              </div>
          </ul>
      </div>

      <div v-if="isMobile && openSideNav" class="fixed inset-0 z-40 bg-black w-[240px] top-[55px] h-full transition-transform duration-300">
          <ul class="mt-[20px] w-full px-5 pb-2 pt-[7px]">
              <div class="w-full sm:hidden inline-block">
                  <!-- Visible only on mobile -->
                  <div class="flex items-center rounded-full bg-[#222222] mb-3">
                      <!-- Input Field -->
                      <input
                          type="text"
                          v-model="searchText"
                          class="form-control block w-full text-gray-200 px-5 py-1.5 text-base font-normal bg-black placeholder-gray-400
                          bg-clip-padding border border-solid border-l-gray-400 border-y-gray-700 rounded-l-full transition ease-in-out m-0 border-transparent
                          focus:ring-0"
                          placeholder="Type here..."
                      />

                      <!-- Magnify Icon as Button -->
                      <div @click="handleSearch" class="mx-6 cursor-pointer flex items-center justify-center">
                          <MagnifyIcon fillColor="#FFFFFF" :size="23" />
                      </div>
                  </div>
              </div>
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

      <div v-if="!isMobile" :style="{
          width: (openSideNav ? 'calc(100% - 240px)' : 'calc(100% - 70px)')
      }" class="h-[calc(100vh-60px)] absolute right-0 top-[35px]">
          <slot></slot>  
      </div>

      <div v-else class="h-[calc(100vh-60px)] absolute right-0 top-[30px] w-full">
          <slot></slot>  
      </div>
  </div>
</template>

<script setup lang="ts">
import MenuIcon from "vue-material-design-icons/Menu.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import SideNavItems from "../components/SideNavItems.vue";
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";

const searchText = ref('');
const openSideNav = ref(false);
const router = useRouter();

const isMobile = computed(() => window.innerWidth < 640);

const toggleSideNav = () => {
  openSideNav.value = !openSideNav.value;
};

const handleSearch = () => {
  if (!searchText.value.trim()) {
      console.warn('Search query is empty');
      return;
  }
  router.push({ name: 'Search', params: { query: searchText.value } });
  console.log('Search query:', searchText.value);
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
