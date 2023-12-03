import { defineStore } from 'pinia';
import {
  onMounted, ref, computed,
} from 'vue';
import type { MonthBankTotal } from '@/utilities/types';
import { useSpendingStore } from './useSpendingStore';

export const useCalculateStore = defineStore('calculate', () => {
  const spendingStore = useSpendingStore();

  const monthBankTotal = ref<MonthBankTotal>({
    balance: 0,
    expense: 0,
    income: 0,
  });

  onMounted(async () => {
    try {
      await spendingStore.getExpense();
      await spendingStore.getIncomeList();
    } catch (err) {
      console.log(err);
    }
  });

  const totalCalculateFormat = computed(() => new Date().toISOString().slice(0, 7));

  const expenseMonthTotal = computed(() => {
    let total = 0;
    spendingStore.expenseList.forEach((expense) => {
      if (expense.date.slice(0, 7) === totalCalculateFormat.value) {
        total += Number(expense.amount);
      }
    });
    return total;
  });

  const incomeMonthTotal = computed(() => {
    let total = 0;
    spendingStore.incomeList.forEach((expense) => {
      if (expense.date.slice(0, 7) === totalCalculateFormat.value) {
        total += Number(expense.amount);
      }
    });
    return total;
  });

  const calculateMonthTotal = computed<number>(() => incomeMonthTotal.value - expenseMonthTotal.value);

  const singleBankTotal = computed(() => spendingStore.expenseList.reduce((acc: Record<string, unknown>, item) => {
    const { personalBankAccount, amount } = item;
    if (personalBankAccount?.bankName! in acc) {
      acc[personalBankAccount?.bankName!] = (acc[personalBankAccount?.bankName!] as number) + Number(amount);
    } else {
      acc[personalBankAccount?.bankName!] = Number(amount);
    }
    return acc;
  }, {}));

  return {
    monthBankTotal,
    incomeMonthTotal,
    expenseMonthTotal,
    calculateMonthTotal,
    singleBankTotal,
    totalCalculateFormat,
  };
});
