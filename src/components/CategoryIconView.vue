<script setup lang="ts">
  import type { CategoryIcon } from '@/utilities/types';

  const props = defineProps<{
    category: CategoryIcon
  }>()

   //取出 category 顯示
   
</script>

<template>
  <button type="button" class="btn">
    <span class="material-icons-outlined h1 mb-0"> {{ props.category.iconName }} </span>
    <p class="mb-0">{{ props.category.name }}</p>      
  </button>
</template>