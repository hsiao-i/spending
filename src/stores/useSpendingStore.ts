import { defineStore } from 'pinia';
import type { Expense } from '@/utilities/types';
import { ref } from 'vue';
import axios from '@/utilities/http';

export const useSpendingStore = defineStore('spending', () => {
  const expenseList = ref<Expense[]>([]);
  const getExpense = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const url = `expenses?_expand=personalBankAccount&_expand=expenseCategory&userId=${userId}`;
      const res = await axios.get(url);
      expenseList.value = res.data;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return { expenseList, getExpense };
});
