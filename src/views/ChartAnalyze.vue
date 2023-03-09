<script setup lang="ts">
import { useSpendingStore } from '@/stores/useSpendingStore';
import { onMounted, computed, ref } from 'vue';
import type { ChartData, ChartOptions } from 'chart.js';
import PieChart from '@/components/PieChart.vue';

const spendingStore = useSpendingStore();

// 取出 expense 後重組
const calculate = computed(() => spendingStore.expenseList
  .map((expense) => ({
    date: expense.date,
    amount: Number(expense.amount),
    categoryName: expense.expenseCategory?.name,
  }))
  .filter((item) => {
    console.log(new Date().toISOString().slice(0, 7));
    return item.date.slice(0, 7) === new Date().toISOString().slice(0, 7);
  }));

/* eslint no-undef: "error" */
const refactor = computed(() => calculate.value
  .reduce((acc: Record<string, unknown>, item) => {
    const { categoryName, amount } = item;
    if (categoryName! in acc) {
      acc[categoryName!] = (acc[categoryName!] as number) + amount;
    } else {
      acc[categoryName!] = amount;
    }
    return acc;
  }, {}));

// 圖表
const expenseChartDate = ref<ChartData<'pie'>>({
  labels: Object.keys(refactor.value),
  // labels: ['飲食', '交通', '購物', '娛樂', 'undefined'],
  datasets: [
    {
      label: '每月支出類別比例',
      data: [100, 200, 300, 590, 100],
      // data: Object.values(refactor.value),
      backgroundColor: [
        '#77CEFF',
        '#0079AF',
        '#123E6B',
        '#97B0C4',
        '#A5C8ED',
      ],
    },
  ],
});

const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'title',
    },
  },
});

onMounted(async () => {
  await spendingStore.getExpense();
  expenseChartDate.value.labels = Object.keys(refactor.value);
  console.log(calculate.value);
  console.log(refactor.value);
  console.log(Object.keys(refactor.value));
  // console.log(Object.values(refactor.value));
});
</script>

<template>

  圖表分析
  <PieChart
    :expense-data="expenseChartDate"
    :chartOptions="chartOptions"
  />
</template>
