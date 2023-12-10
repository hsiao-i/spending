import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CategoryIcon } from '@/utilities/types';
import axios from '@/utilities/http';
import Swal from 'sweetalert2';

export const useCategoryStore = defineStore('category', () => {
  const categoryIcon = ref<CategoryIcon[]>([]);
  const expenseUrl = '/expenseCategories';
  const getExpenseCategories = async () => {
    try {
      const res = await axios.get(expenseUrl);
      categoryIcon.value = res.data;
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '錯誤，請聯繫管理員',
      });
    }
  };

  const categoryIncome = ref<CategoryIcon[]>([]);
  const incomeUrl = '/incomeCategories';
  const getIncomeCategories = async () => {
    try {
      const res = await axios.get(incomeUrl);
      categoryIncome.value = res.data;
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '錯誤，請聯繫管理員',
      });
    }
  };

  return {
    categoryIcon, getExpenseCategories, categoryIncome, getIncomeCategories,
  };
});
