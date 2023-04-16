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
      categoryIcon.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const categoryIncome = ref<CategoryIcon[]>([]);
  const incomeUrl = '/incomeCategories';
  const getIncomeCategories = async () => {
    try {
      const res = await axios.get(incomeUrl);
      categoryIncome.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    categoryIcon, getExpenseCategories, categoryIncome, getIncomeCategories,
  };
});
