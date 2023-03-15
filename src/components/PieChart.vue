<script setup lang="ts">
import { toRefs } from 'vue';
import { Pie } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  // PieElement,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  // PieElement,
  ArcElement,
  Filler,
);
// interface ChartOption {
//   responsive: boolean;
//   maintainAspectRatio: boolean;
//   plugins: {
//     title: {
//       display: boolean;
//       text: string;
//     };
//   };
// }

// interface ChartData {
//   labels: string[];
//   datasets: {
//     label: string;
//     data: number[];
//   }[];
// }

const props = defineProps<{
  chartId: string,
  chartData: ChartData<'pie'>,
  chartOptions: ChartOptions<'pie'>
}>();
const { chartData, chartOptions } = toRefs(props);
// const dexpensePieChartDate = ref<ChartData<'pie'>>({
//   // labels: Object.keys(refactor.value),
//   labels: ['飲食', '交通', '購物', '娛樂', 'undefined'],
//   datasets: [
//     {
//       label: '每月支出類別比例',
//       data: [100, 200, 300, 590, 100],
//       // data: Object.values(refactor.value),
//       backgroundColor: [
//         '#77CEFF',
//         '#0079AF',
//         '#123E6B',
//         '#97B0C4',
//         '#A5C8ED',
//       ],
//     },
//   ],
// });
// const options = ref<ChartOptions<'pie'>>({
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'title',
//     },
//   },
// });

</script>
<template>
  <div class="w-75">
    <Pie
      :id="chartId"
      :data="chartData"
      :options="chartOptions"
    />
  </div>

  <!-- <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="expenseData"
  /> -->
</template>
