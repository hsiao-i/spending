<script setup lang="ts">
import { RouterView } from 'vue-router';
import FrontNavbar from './components/FrontNavbar.vue';
import FrontFooter from './components/FrontFooter.vue';
</script>

<template>
  <FrontNavbar />
  <RouterView />
  <FrontFooter />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

body {
  /* background-color: antiquewhite; */
  color: #22272E;
}
img {
  max-width: 100%;
  height: auto;
}
.fm-fre {
  font-family: 'Fredoka One', cursive;
}

.letter-1 {
  letter-spacing: 2px;
}

.max-vh-80 {
  max-height: 80vh;
}
</style>
