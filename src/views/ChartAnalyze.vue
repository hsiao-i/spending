<script setup lang="ts">
import { useSpendingStore } from '@/stores/useSpendingStore';
import { useCalculateStore } from '@/stores/useCalculateStore';
import {
  onMounted, ref, watch, computed,
} from 'vue';

import type { ChartData, ChartOptions } from 'chart.js';
import PieChart from '@/components/PieChart.vue';
import type { Expense } from '@/utilities/types';

const spendingStore = useSpendingStore();
const calculateStore = useCalculateStore();
const nowMonth = calculateStore.totalCalculateFormat;
const topThreeExpense = ref<Expense[]>([]);

interface RefactorCalculate {
  date: string;
  amount: number;
  categoryName: string | undefined;
}

// 取出 expense 後重組，並篩選出當月份
const calculate = ref<RefactorCalculate[]>([]);
watch(
  () => spendingStore.expenseList,
  () => {
    const filterMonthList = spendingStore.expenseList.filter((expense) => expense.date.slice(0, 7) === nowMonth);

    // 取出當月支出前三名
    topThreeExpense.value = filterMonthList.sort((a, b) => Number(b.amount) - Number(a.amount)).slice(0, 3);
    console.log(topThreeExpense.value);

    const refactorList = filterMonthList.map((expense) => ({
      date: expense.date,
      amount: Number(expense.amount),
      categoryName: expense.expenseCategory?.name,
    }));
    calculate.value = refactorList;
  },
);

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

// 重新處理 income 資料
const incomeCalculate = ref<RefactorCalculate[]>([]);
watch(
  () => spendingStore.incomeList,
  () => {
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

const loading = ref(false);
// 支出圖表設置
const expenseChartData = ref<ChartData<'pie'>>({
  labels: [],
  //  範例 labels: ['飲食', '交通', '購物', '娛樂'],
  datasets: [
    {
      label: '每月支出類別',
      data: [],
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
  // 範例 labels: ['飲食', '交通', '購物', '娛樂'],
  datasets: [
    {
      label: '每月收入類別',
      data: [],
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
});

onMounted(async () => {
  loading.value = false;
  try {
    await spendingStore.getExpense();
    await spendingStore.getIncomeList();

    expenseChartData.value.labels = Object.keys(refactor.value);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value) as number[];

    incomeChartData.value.labels = Object.keys(incomeRefactor.value);
    incomeChartData.value.datasets[0].data = Object.values(incomeRefactor.value) as number[];

    loading.value = true;
  } catch (err) {
    console.log(err);
  }

  console.log(calculate.value);
  console.log(spendingStore.expenseList);
});

watch(
  () => refactor.value,
  () => {
    expenseChartData.value.labels = Object.keys(refactor.value);
    expenseChartData.value.datasets[0].data = Object.values(refactor.value) as number[];
  },
  {
    immediate: true,
  },
);

watch(
  () => incomeRefactor.value,
  () => {
    incomeChartData.value.labels = Object.keys(incomeRefactor.value);
    incomeChartData.value.datasets[0].data = Object.values(incomeRefactor.value) as number[];
  },
  {
    immediate: true,
  },
);

</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-5">當月消費圖表分析</h2>
    <div class="bg-white rounded-3 shadow p-4 mb-3">
      <h3 class="text-center h5 mb-3">當月支出金額前三名</h3>
      <div class="d-flex align-items-center flex-column">
        <p v-if="topThreeExpense.length === 0" class="text-secondary">目前無支出記錄</p>
        <div
          v-else
          class="w-75 border rounded-pill px-3 py-2 mb-3 d-flex align-items-center justify-content-center text-center"
          v-for="(expense, i) in topThreeExpense"
          :key="expense.uuid"
        >
          <div
            class="rounded-circle border border-2 me-3 d-flex  justify-content-center"
            style="width: 30px; height: 30px">
            {{ i + 1 }}
          </div>
          <div class="d-flex w-75">
            <p class="mb-0 w-25">{{ expense.expenseCategory?.name }}</p>
            <p class="mb-0 w-25">{{ expense.name }}</p>
            <p class="mb-0 w-50 text-center">${{ expense.amount }}</p>

          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div class="row">
      <div class="col-md-6">
        <div class="bg-white rounded-3 shadow p-4 mb-3 min-vh-52">
          <h3 class="text-center h5">當月<span class="text-danger fw-bold">支出</span>類別比例</h3>

          <template v-if="calculate.length !== 0">
            <PieChart
              v-if="loading"
              :chart-id="'expense-category-chart'"
              :chart-data="expenseChartData"
              :chart-options="chartOptions"
            />
          </template>
          <template v-else>
            <div class="d-flex align-items-center justify-content-center min-vh-38">
              <p class="text-secondary">目前無支出記錄</p>
            </div>
          </template>
        </div>

      </div>
      <div class="col-md-6">
        <div class="bg-white rounded-3 shadow p-4 min-vh-52">
          <h3 class="text-center h5">當月<span class="text-success fw-bold">收入</span>類別比例</h3>
          <template v-if="incomeCalculate.length !== 0">
            <PieChart
              v-if="loading"
              :chart-id="'income-category-chart'"
              :chart-data="incomeChartData"
              :chart-options="chartOptions"
            />
          </template>
          <template v-else>
            <div class="d-flex align-items-center justify-content-center min-vh-38">
              <p class=" text-secondary">目前無收入記錄</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.min-vh-52 {
  min-height: 52vh;
}
.min-vh-38 {
  min-height: 38vh;
}
</style>
