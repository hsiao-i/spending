import { defineStore } from 'pinia';
import {
  onMounted, ref, watch, computed,
} from 'vue';
import type { MonthBankTotal } from '@/utilities/types';
// import { usePersonalBank } from './usePersonalBank';
import { useSpendingStore } from './useSpendingStore';

export const useCalculateStore = defineStore('calculate', () => {
  // const bankStore = usePersonalBank();
  const spendingStore = useSpendingStore();

  const monthBankTotal = ref<MonthBankTotal>({
    balance: 0,
    expense: 0,
    income: 0,
  });

  onMounted(async () => {
    // bankStore.getBankAccountList();
    try {
      await spendingStore.getExpense();
      await spendingStore.getIncomeList();
      // const expenseTotal = spendingStore.expenseList.reduce((total: number, expense) => total + Number(expense.amount), 0);
      // console.log('expenseTotal:', expenseTotal);

      // monthBankTotal.value = {
      //   balance: monthBankTotal.value.balance,
      //   expense: expenseTotal,
      //   income: monthBankTotal.value.income,
      // };

      // const expenseTotal = computed<number>(() => spendingStore.expenseList.reduce((total: number, expense) => total + Number(expense.amount), 0));

      // const incomeMonthTotal = computed<number>(() => spendingStore.incomeList.reduce((total: number, income) => total + Number(income.amount), 0));

      // const calculateMonthTotal = computed<number>(() => incomeMonthTotal.value - expenseTotal.value);

      // monthBankTotal.value = {
      //   balance: calculateMonthTotal.value,
      //   expense: expenseTotal.value,
      //   income: incomeMonthTotal.value,
      // };
    } catch (err) {
      console.log(err);
    }
  });

  // watch(
  //   () => monthBankTotal.value,
  //   (n, o) => {
  //     console.log('monthBankTotal changed:', monthBankTotal.value);
  //     const expenseTotal = spendingStore.expenseList.reduce((total: number, expense) => total + Number(expense.amount), 0);
  //     console.log('expenseTotal:', expenseTotal);

  //     monthBankTotal.value = {
  //       balance: monthBankTotal.value.balance,
  //       expense: expenseTotal,
  //       income: monthBankTotal.value.income,
  //     };
  //     console.log(n, o);
  //     console.log(monthBankTotal.value);
  //   },
  // );

  const expenseTotal = computed<number>(() => spendingStore.expenseList.reduce((total: number, expense) => total + Number(expense.amount), 0));

  const incomeMonthTotal = computed<number>(() => spendingStore.incomeList.reduce((total: number, income) => total + Number(income.amount), 0));

  const calculateMonthTotal = computed<number>(() => incomeMonthTotal.value - expenseTotal.value);

  // console.log(monthBankTotal.value);
  return {
    monthBankTotal,
    incomeMonthTotal,
    expenseTotal,
    calculateMonthTotal,
  };
  //  monthBankTotal,
});
