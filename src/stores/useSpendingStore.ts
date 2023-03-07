import { defineStore } from 'pinia';
import type { Expense, Income } from '@/utilities/types';
import { ref } from 'vue';
import axios from '@/utilities/http';
import { v4 as uuidv4 } from 'uuid';

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

  // 新增、編輯收入
  const updateIncomeData = ref<Income>({
    uuid: uuidv4(),
    dateTime: new Date(),
    // 取出像 20xx/xx/xx
    date: '',
    name: '',
    amount: '',
    description: '',
    incomeCategoryId: 0,
    personalBankAccountId: 0,
    userId: '',
  });

  const incomeForm = ref();
  // const emit = defineEmits(['closeModal']);
  const updateIncomeInfo = async () => {
    try {
      updateIncomeData.value.userId = localStorage.getItem('userId');
      const url = '/incomes';
      const request: 'post' | 'put' = 'post';
      const situation = '成功新增收入';

      // if (openState.value === 'edit') {
      //   url = `/personalBankAccounts/${account.value.id}`;
      //   request = 'put';
      //   situation = '成功更新帳戶';
      // }
      const res = await axios[request](url, updateIncomeData.value);
      console.log(res);
      alert(situation);
      incomeForm.value.resetForm();
      // emit('closeModal');
      // emit('getBankAccount');
    } catch (err) {
      console.log(err);
    }
  };

  // 取得收入列表
  // const getIncomeList = ref<Income[]>([]);

  return {
    expenseList, getExpense, updateIncomeInfo, updateIncomeData,
  };
});
