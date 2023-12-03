import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { Collapse } from 'bootstrap';

export const useBsCollapseStore = defineStore('bsCollapse', () => {
  let collapse: Collapse;
  const collapseSection = ref<HTMLElement | null >(null);

  const collapseToggle = () => {
    collapse.toggle();
  };

  onMounted(() => {
    collapse = new Collapse(collapseSection.value!);
  });

  return { collapseToggle };
});
