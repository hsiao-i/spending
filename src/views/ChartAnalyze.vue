<script setup lang="ts">
import { useSpendingStore } from '@/stores/useSpendingStore';
// import {
//   onMounted, computed, ref, watch,
// } from 'vue';
import {
  onMounted, ref, watch, computed,
} from 'vue';

import type { ChartData, ChartOptions } from 'chart.js';
import PieChart from '@/components/PieChart.vue';

const spendingStore = useSpendingStore();

interface RefactorCalculate {
  date: string;
  amount: number;
  categoryName: string | undefined;
}

// 取出 expense 後重組

const calculate = ref<RefactorCalculate[]>([]);
watch(
  () => spendingStore.expenseList,
  () => {
    const nowMonth = new Date().toISOString().slice(0, 7);
    const filterMonthList = spendingStore.expenseList.filter((expense) => expense.date.slice(0, 7) === nowMonth);
    const refactorList = filterMonthList.map((expense) => ({
      date: expense.date,
      amount: Number(expense.amount),
      categoryName: expense.expenseCategory?.name,
    }));
    calculate.value = refactorList;
  },
);

// const calculate = computed(() => spendingStore.expenseList
//   .map((expense) => ({
//     date: expense.date,
//     amount: Number(expense.amount),
//     categoryName: expense.expenseCategory?.name,
//   }))
//   .filter((item) => {
//     console.log(new Date().toISOString().slice(0, 7));
//     return item.date.slice(0, 7) === new Date().toISOString().slice(0, 7);
//   }));

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

// const refactor = computed(() => spendingStore.refactor);
const loading = ref(false);
// 圖表
const expenseChartData = ref<ChartData<'pie'>>({
  labels: [],
  // labels: ['飲食', '交通', '購物', '娛樂', 'undefined'],
  datasets: [
    {
      label: '每月支出類別比例',
      data: [],
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
      text: '每月支出類別比例',
    },
  },
});

onMounted(async () => {
  loading.value = false;
  try {
    await spendingStore.getExpense();
    expenseChartData.value.labels = Object.keys(refactor.value);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value);
    loading.value = true;
  } catch (err) {
    console.log(err);
  }
});

watch(
  () => refactor.value,
  // () => spendingStore.refactor,
  () => {
    // expenseChartDate.value.labels = ['1', '2', '3', '4', '5'];
    expenseChartData.value.labels = Object.keys(refactor.value);
    // expenseChartData.value.labels = Object.keys(spendingStore.refactor);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value);
  },
  {
    immediate: true,
  },
);

// onUpdated(() => {
//   expenseChartDate.value.labels = Object.keys(spendingStore.refactor);
// });

</script>

<template>
  <!-- {{ spendingStore.expenseList }} -->
  {{ refactor }}
  <!-- {{ Object.keys(spendingStore.refactor) }} -->
  {{ Object.keys(refactor) }}
  {{ Object.values(refactor) }}
  <!-- {{ refactor.value }} -->
  <!-- {{ spendingStore.calculate }} -->
  圖表分析
  <PieChart
    v-if="loading"
    :expense-data="expenseChartData"
    :chart-options="chartOptions"
  />
</template>
