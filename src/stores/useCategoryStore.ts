import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CategoryIcon } from '@/utilities/types';
import axios from '@/utilities/http';

export const useCategoryStore = defineStore('category', () => {
  const categoryIcon = ref<CategoryIcon[]>([]);
  const expenseUrl = '/expenseCategories';
  const getExpenseCategories = async () => {
    try {
      const res = await axios.get(expenseUrl);
      console.log(res);
      categoryIcon.value = res.data;
      console.log(categoryIcon);
    } catch (e) {
      console.log(e);
    }
  };

  const categoryIncome = ref<CategoryIcon[]>([]);
  const incomeUrl = '/incomeCategories';
  const getIncomeCategories = async () => {
    try {
      const res = await axios.get(incomeUrl);
      console.log(res);
      categoryIncome.value = res.data;
      console.log(categoryIncome);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    categoryIcon, getExpenseCategories, categoryIncome, getIncomeCategories,
  };
});
