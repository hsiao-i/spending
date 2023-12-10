import { defineStore } from 'pinia';
import type { Expense, Income } from '@/utilities/types';
import { ref } from 'vue';
import axios from '@/utilities/http';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

export const useSpendingStore = defineStore('spending', () => {
  // 取得支出列表
  const expenseList = ref<Expense[]>([]);
  const getExpense = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const url = `expenses?_expand=personalBankAccount&_expand=expenseCategory&userId=${userId}`;
      const res = await axios.get(url);
      expenseList.value = res.data;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '取得支出列表失敗',
        confirmButtonColor: '#cb7d56',
      });
    }
  };

  // 新增、編輯收入
  const updateIncomeData = ref<Income>({
    uuid: uuidv4(),
    dateTime: new Date(),
    date: '',
    name: '',
    amount: '',
    description: '',
    incomeCategoryId: 0,
    personalBankAccountId: 0,
    userId: '',
  });

  const formatDate = () => {
    // 取出日期格式為 YYYY-MM-DD
    updateIncomeData.value.date = new Date().toISOString().slice(0, 10);
  };

  // 取得收入列表
  const incomeList = ref<Income[]>([]);
  const getIncomeList = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const url = `incomes?_expand=personalBankAccount&_expand=incomeCategory&userId=${userId}`;
      const res = await axios.get(url);
      incomeList.value = res.data;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '取得收入列表失敗',
        confirmButtonColor: '#cb7d56',
      });
    }
  };

  const requestState = ref('');
  const updateIncomeInfo = async () => {
    try {
      updateIncomeData.value.userId = localStorage.getItem('userId');
      let url = '/incomes';
      let request: 'post' | 'put' = 'post';
      let situation = '成功新增收入';

      if (requestState.value === 'edit') {
        url = `/incomes/${updateIncomeData.value.id}`;
        request = 'put';
        situation = '成功更新收入';
      }
      await axios[request](url, updateIncomeData.value);
      Swal.fire({
        icon: 'success',
        title: situation,
        confirmButtonColor: '#7fbcd2',
      });
      getIncomeList();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '失敗，請再次操作或連繫管理員',
        confirmButtonColor: '#cb7d56',
      });
    }
  };

  return {
    expenseList,
    getExpense,
    updateIncomeInfo,
    updateIncomeData,
    formatDate,
    incomeList,
    getIncomeList,
    requestState,
  };
});
