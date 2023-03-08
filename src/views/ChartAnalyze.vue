<script setup lang="ts">
import { useSpendingStore } from '@/stores/useSpendingStore';
import { onMounted, computed } from 'vue';

const spendingStore = useSpendingStore();
onMounted(() => {
  spendingStore.getExpense();
});

// const useExpenseCatogories = computed(() =>
//  spendingStore.expenseList.filter((expense, index, arr) => arr.indexOf(expense.expenseCategory?.name) === index));
const handleExpenseChart = computed(() => spendingStore.expenseList.map((expense) => expense.expenseCategory?.name));

const expenseCategory = computed(() => handleExpenseChart.value.filter((category, index, arr) => arr.indexOf(category) === index));

// const calculateExpense = computed(() => {
//   spendingStore.expenseList.forEach((item) => {
//     if (spendingStore.expenseList.expenseCategory?.name)
//   })

// })

const test = computed(() => spendingStore.expenseList.map((expense) => `${expense.expenseCategory?.name}: ${expense.amount}`));

onMounted(() => {
  console.log(handleExpenseChart.value);
  console.log(expenseCategory.value);
  console.log(test.value);
  // console.log(useExpenseCatogories.value);
});
</script>

<template>
  <div>
    圖表分析
  </div>
</template>
