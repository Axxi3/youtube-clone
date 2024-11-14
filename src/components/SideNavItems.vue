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
            <span v-if="!openSideNav">{{ iconString.substring(0,4) }}</span>
            <span v-else>{{ iconString }}</span>
        </div>
    </li>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import Home from 'vue-material-design-icons/Home.vue';
import FolderPlayOutline from 'vue-material-design-icons/FolderPlayOutline.vue';
import ImageMultiple from 'vue-material-design-icons/ImageMultiple.vue';
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
import History from 'vue-material-design-icons/History.vue';
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
import VideoPlusOutlineIcon from 'vue-material-design-icons/VideoPlusOutline.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import CoursesIcon from 'vue-material-design-icons/Book.vue';
import MoviesIcon from 'vue-material-design-icons/Filmstrip.vue';
import GamingIcon from 'vue-material-design-icons/Gamepad.vue';
import MusicIcon from 'vue-material-design-icons/Music.vue';
import NewsIcon from 'vue-material-design-icons/Newspaper.vue';

const props = defineProps({
    openSideNav: Boolean,
    iconString: String,
});

const { openSideNav, iconString } = toRefs(props);
const router = useRouter();

let icon = null;

if (iconString.value === 'Home') icon = Home;
if (iconString.value === 'Subscriptions') icon = FolderPlayOutline;
if (iconString.value === 'Library') icon = ImageMultiple;
if (iconString.value === 'Liked') icon = ThumbUpOutline;
if (iconString.value === 'History') icon = History;
if (iconString.value === 'Watch Later') icon = ClockOutline;
if (iconString.value === 'Trending') icon = TrendingUp;
if (iconString.value === 'Gaming') icon = GamingIcon;
if (iconString.value === 'Music') icon = MusicIcon;
if (iconString.value === 'News') icon = NewsIcon;


function navigateToPath() {
    let path = '/';
    switch (iconString.value) {
        case 'Home':
            path = '/';
            break;
        case 'Trending':
            path = '/trending';
            break;
        case 'Subscriptions':
            path = '/subscriptions';
            break;
        case 'Library':
            path = '/library';
            break;
        case 'Liked':
            path = '/liked';
            break;
        case 'History':
            path = '/history';
            break;
        case 'Watch Later':
            path = '/watch-later';
            break;  
               case 'Gaming':
            path = '/gaming';
            break;
        case 'Add Video':
            path = '/add-video';
            break;
            case 'Music':
            path = '/music';
            break;
        case 'Delete Video':
            path = '/delete-video';
            break;
    }
    router.push(path);
}
</script>

<style scoped>
/* Your styles here */
</style>
