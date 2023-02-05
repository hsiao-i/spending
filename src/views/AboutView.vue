<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

const person = ref({})

const getData = async () => {
  try{
    const res = await axios.get('https://randomuser.me/api/')
    console.log(res.data.results[0]);
    person.value = res.data.results[0]
    console.log(person.value);
  } catch(err) {
    console.log(err);
  }
  
}
// getData()
onMounted(() => {
  getData()
})
    
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
