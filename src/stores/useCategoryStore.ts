import { defineStore } from "pinia";
import { ref } from 'vue'
import type { CategoryIcon } from '@/utilities/types';
import axios from '@/utilities/http'

export const useCategoryStore = defineStore('category', () => {

  let categoryIcon = ref<CategoryIcon[]>([])
  const url = `${import.meta.env.VITE_PATH}/expenseCategories`
  const getExpenseCategories = async () => {
    try {
      const res = await axios.get(url)
      console.log(res);
      categoryIcon.value = res.data
      console.log(categoryIcon);

    } catch(e) {
      console.log(e);
    }
  }

  return { categoryIcon,getExpenseCategories }

})