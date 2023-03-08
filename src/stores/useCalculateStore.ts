import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import type { MonthBankTotal } from '@/utilities/types';
// import { usePersonalBank } from './usePersonalBank';
import { useSpendingStore } from './useSpendingStore';

export const useCalculateStore = defineStore('calculate', () => {
  // const bankStore = usePersonalBank();
  const spendingStore = useSpendingStore();
  onMounted(() => {
    // bankStore.getBankAccountList();
    spendingStore.getExpense();
    spendingStore.getIncomeList();
  });
  const monthBankTotal = ref<MonthBankTotal>({
    balance: 0,
    expense: 0,
    income: 0,
  });

  watch(
    () => monthBankTotal.value,
    (n, o) => {
      console.log('monthBankTotal changed:', monthBankTotal.value);
      const expenseTotal = spendingStore.expenseList.reduce((total: number, expense) => total + Number(expense.amount), 0);
      console.log('expenseTotal:', expenseTotal);

      monthBankTotal.value = {
        balance: monthBankTotal.value.balance,
        expense: expenseTotal,
        income: monthBankTotal.value.income,
      };
      console.log(n, o);
      console.log(monthBankTotal.value);
    },
  );

  console.log(monthBankTotal.value);
  return { monthBankTotal };
  //  monthBankTotal,
});
