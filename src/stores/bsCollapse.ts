import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { Collapse } from 'bootstrap'

export const useBsCollapseStore = defineStore('bsCollapse', () => {
  // let collapse = ref<HTMLElement | null >(null)
  let collapse: Collapse
  const collapseSection = ref<HTMLElement | null >(null)

  const collapseToggle = () => {
    collapse.toggle()
  }

  const hello = ref('hello')

  // defineExpose({
  //   collapseToggle
  // })

  onMounted(() => {
    collapse = new Collapse(collapseSection.value!)
  })

  return { collapseToggle, hello }
})