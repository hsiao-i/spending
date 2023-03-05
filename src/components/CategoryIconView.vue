<script setup lang="ts">
import type { CategoryIcon } from '@/utilities/types';

const props = defineProps<{
  category: CategoryIcon
}>();

</script>

<template>
  <button type="button" class="btn">
    <span class="material-icons-outlined h1 mb-0"> {{ props.category.iconName }} </span>
    <p class="mb-0">{{ props.category.name }}</p>
  </button>
</template>
