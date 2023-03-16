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

// 重新處理 incom 資料
const incomeCalculate = ref<RefactorCalculate[]>([]);
watch(
  () => spendingStore.incomeList,
  () => {
    const nowMonth = new Date().toISOString().slice(0, 7);
    const filterMonthList = spendingStore.incomeList.filter((income) => income.date.slice(0, 7) === nowMonth);
    const refactorList = filterMonthList.map((income) => ({
      date: income.date,
      amount: Number(income.amount),
      categoryName: income.incomeCategory?.name,
    }));
    incomeCalculate.value = refactorList;
  },
);

const incomeRefactor = computed(() => incomeCalculate.value
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
// 支出圖表設置
const expenseChartData = ref<ChartData<'pie'>>({
  labels: [],
  // labels: ['飲食', '交通', '購物', '娛樂', 'undefined'],
  datasets: [
    {
      label: '每月支出類別比例',
      data: [],
      // data: Object.values(refactor.value),
      backgroundColor: [
        '#7693B5',
        '#8CB9BF',
        '#EECA80',
        '#D98383',
        '#E9BAAA',
        '#D49550',

      ],
    },
  ],
});

// 收入圖表設置
const incomeChartData = ref<ChartData<'pie'>>({
  labels: [],
  // labels: ['飲食', '交通', '購物', '娛樂', 'undefined'],
  datasets: [
    {
      label: '每月支出類別比例',
      data: [],
      // data: Object.values(refactor.value),
      backgroundColor: [
        '#7693B5',
        '#8CB9BF',
        '#EECA80',
        '#D98383',
        '#E9BAAA',
        '#D49550',

      ],
    },
  ],
});

const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
  // plugins: {
  //   title: {
  //     display: true,
  //     text: '每月支出類別比例',
  //   },
  // },
});

onMounted(async () => {
  loading.value = false;
  try {
    await spendingStore.getExpense();
    await spendingStore.getIncomeList();

    expenseChartData.value.labels = Object.keys(refactor.value);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value);

    incomeChartData.value.labels = Object.keys(incomeRefactor.value);
    incomeChartData.value.datasets[0].data = Object.values(incomeRefactor.value);

    loading.value = true;
  } catch (err) {
    console.log(err);
  }
});

watch(
  () => refactor.value,
  () => {
    expenseChartData.value.labels = Object.keys(refactor.value);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value);
  },
  {
    immediate: true,
  },
);

watch(
  () => incomeRefactor.value,
  () => {
    incomeChartData.value.labels = Object.keys(incomeRefactor.value);
    incomeChartData.value.datasets[0].data = Object.values(incomeRefactor.value);
  },
  {
    immediate: true,
  },
);

</script>

<template>
  <div class="container">
    <h2 class="mb-3">當月消費圖表分析</h2>
    <div class="row">
      <div class="col-md-6">
        <div class="bg-white rounded-3 shadow p-4">
          <h3 class="text-center h5">當月<span class="text-danger fw-bold">支出</span>類別比例</h3>
          <PieChart
            v-if="loading"
            :chart-id="'expense-category-chart'"
            :chart-data="expenseChartData"
            :chart-options="chartOptions"
          />
        </div>

      </div>
      <div class="col-md-6">
        <div class="bg-white rounded-3 shadow p-4">
          <h3 class="text-center h5">當月<span class="text-success fw-bold">收入</span>類別比例</h3>
          <PieChart
            v-if="loading"
            :chart-id="'income-category-chart'"
            :chart-data="incomeChartData"
            :chart-options="chartOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>
