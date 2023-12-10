<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ModalShare from '@/components/ModalShare.vue';
import MultipleSpending from '@/components/MultipleSpending.vue';
import SingleSpending from '@/components/SingleSpending.vue';
import EditSpending from '@/components/EditSpending.vue';
import DeleteSpending from '@/components/DeleteSpending.vue';
import { v4 as uuidv4 } from 'uuid';
import type { Expense, Income } from '@/utilities/types';
import { useSpendingStore } from '@/stores/useSpendingStore';
import { usePersonalBank } from '@/stores/usePersonalBank';
import { useCalculateStore } from '@/stores/useCalculateStore';

const updateExpense = ref<Expense>({
  uuid: uuidv4(),
  dateTime: new Date(),
  // 取出像 20xx/xx/xx
  date: '',
  name: '',
  amount: '',
  description: '',
  expenseCategoryId: 0,
  personalBankAccountId: 0,
  userId: '',
});

const spendingStore = useSpendingStore();
const bankStore = usePersonalBank();
const totalStore = useCalculateStore();
onMounted(() => {
  spendingStore.getExpense();
  spendingStore.getIncomeList();
  bankStore.getBankAccountList();
});

const modalShare = ref();

const openModalStatus = ref('');
const expenseOrIncome = ref('');
const openModal = (status: string, editInfo?: Expense | Income, expenseIncome?: string) => {
  openModalStatus.value = status;
  if (expenseIncome) {
    expenseOrIncome.value = expenseIncome!;
  }

  if (status === 'editSpending' || status === 'deleteSpending') {
    updateExpense.value = JSON.parse(JSON.stringify(editInfo));
    spendingStore.updateIncomeData = JSON.parse(JSON.stringify(editInfo));
  } else if (status === 'single') {
    updateExpense.value = {
      uuid: uuidv4(),
      dateTime: new Date(),
      // 取出像 20xx/xx/xx
      date: '',
      name: '',
      amount: '',
      description: '',
      expenseCategoryId: 0,
      personalBankAccountId: 0,
      userId: '',
    };
  }

  modalShare.value.openModalInComponent();
};
const closeModal = () => {
  modalShare.value.closeModalInComponent();
};

// 透過 vue-calendar 取得今天的日期
const calendarToday = ref([
  {
    label: 'today',
    highlight: {
      color: 'blue',
    },
    dates: new Date(),
  },
]);

// datePicker 選擇的日期
const calendarSelected = ref(new Date());
const formatSelectedDate = computed(() => {
  const date = calendarSelected.value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

// 篩選出選擇日期的支出
const filterSelectedExpense = computed(() => spendingStore.expenseList.filter((spendList) => spendList.date === formatSelectedDate.value));

// 篩選出選擇日期的收入
const filterSelectedIncome = computed(() => spendingStore.incomeList.filter((incomeList) => incomeList.date === formatSelectedDate.value));

// 計算出選擇日期當天的總支出
const oneDaySpendingTotal = computed(() => {
  let total = 0;
  filterSelectedExpense.value.forEach((spendList) => {
    total += Number(spendList.amount);
  });
  return total;
});

// 計算出選擇日期當天的總收入
const oneDayIncomeTotal = computed(() => {
  let total = 0;
  filterSelectedIncome.value.forEach((incomeList) => {
    total += Number(incomeList.amount);
  });
  return total;
});
</script>

<template>
  <div class="container my-5">
    <h2 class="mb-5">當月收支記錄</h2>
    <ul class="list-unstyled mb-3 rounded-4 shadow-sm bg-light">
      <template class="row">

        <li class="col-md-4 mb-3">
          <div class=" px-5 py-4">

            <h5>當月總額</h5>
            <p class="text-center h4 text-primary">{{ $toThousandth(totalStore.calculateMonthTotal) }}</p>
          </div>
        </li>
        <li class="col-md-4 mb-3">
          <div class="px-5 py-4">

            <h5>當月收入</h5>
            <p class="text-center h4 text-success">{{ $toThousandth(totalStore.incomeMonthTotal) }}</p>
          </div>
        </li>
        <li class="col-md-4">
          <div class=" px-5 py-4">
            <h5>當月支出</h5>
            <p class="text-center h4 text-danger">{{ $toThousandth(totalStore.expenseMonthTotal) }}</p>
          </div>
        </li>
      </template>

    </ul>
    <div class="row">
      <div class="col-md-6 mb-5">
        <div class="min-vh-80 max-vh-80 overflow-auto shadow-sm p-4 rounded-4 bg-light d-flex align-items-center">
          <VDatePicker
            borderless
            transparent
            expanded
            v-model="calendarSelected"
            :attributes="calendarToday"
            mode="single"
            class="custom-selected"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-light shadow-sm rounded-3 p-4 min-vh-80 max-vh-80 overflow-auto">
          <div class="btn-group text-end mb-3" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary" @click="openModal('single')">+ 記錄單筆</button>
            <!-- <button type="button" class="btn btn-outline-primary" @click="openModal('multiple')">+ 記錄多筆 </button> -->
          </div>
          <div class="d-flex justify-content-between">
            <p class="h5">{{ formatSelectedDate }}</p>
            <div class="d-flex">
              <div>

                <p v-if="filterSelectedExpense" class="text-danger me-5">$ {{ $toThousandth(oneDaySpendingTotal) }}</p>
                <p v-else class="text-danger me-3">$ 0</p>
              </div>
              <div>
                <p v-if="filterSelectedIncome" class="text-success">$ {{ $toThousandth(oneDayIncomeTotal) }}</p>
                <p v-else class="text-success">$ 0</p>
              </div>
            </div>

          </div>
          <div class="mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">類別</th>
                  <th scope="col">名稱</th>
                  <th scope="col" class="text-end">金額</th>
                  <th scope="col" class="text-end">修改</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="expense in filterSelectedExpense" :key="expense.uuid" role="button" class="tr-hover">
                  <td>{{ expense.expenseCategory?.name }}</td>
                  <td>{{ expense.name }}</td>
                  <td class="text-end">
                    <span class="text-danger">
                      $ {{ $toThousandth(expense.amount) }}</span> <br>
                    <span class="h6 mb-0 badge-outline-primary">{{ expense.personalBankAccount?.bankName }}</span>
                  </td>
                  <td>
                    <div class="text-end">
                      <button type="button" class="me-2 btn-hover p-0" @click="openModal('editSpending', expense, 'expense')">
                        <span class="material-icons-outlined text-secondary btn-hover">edit</span>
                      </button>
                      <button type="button" class="btn-hover p-0" @click="openModal('deleteSpending', expense, 'expense')">
                        <span class="material-icons-outlined text-secondary btn-hover">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-for="income in filterSelectedIncome" :key="income.uuid" role="button" class="tr-hover">
                  <td>{{ income.incomeCategory?.name }}</td>
                  <td>{{ income.name }}</td>
                  <td class="text-end">
                    <span class="text-success">
                      $ {{ $toThousandth(income.amount) }}
                    </span> <br>
                    <span class="h6 mb-0 badge-outline-primary">
                      {{ income.personalBankAccount?.bankName }}
                    </span>
                  </td>
                  <td>
                    <div class="text-end">
                      <button type="button" class="me-2 btn-hover p-0" @click="openModal('editSpending', income, 'income')">
                        <span class="material-icons-outlined text-secondary btn-hover">edit</span>
                      </button>
                      <button type="button" class="btn-hover p-0" @click="openModal('deleteSpending', income, 'income')">
                        <span class="material-icons-outlined text-secondary btn-hover">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ModalShare ref="modalShare">
          <template v-slot:record-spending>
            <SingleSpending
              v-if="openModalStatus === 'single'"
              :update-expense="updateExpense"
              @close-modal="closeModal"
            />
            <MultipleSpending v-else-if="openModalStatus === 'multiple'" />
          </template>
          <template v-slot:record-assets>
            <EditSpending
              v-if="openModalStatus === 'editSpending'"
              :update-expense="updateExpense"
              :expense-or-income="expenseOrIncome"
              @close-modal="closeModal"
            />
            <DeleteSpending
              v-else-if="openModalStatus === 'deleteSpending'"
              :update-expense="updateExpense"
              :expense-or-income="expenseOrIncome"
              @close-modal="closeModal"
            />
          </template>

        </ModalShare>
      </div>
    </div>

  </div>
</template>

<style scope lang="scss">
.badge-outline-primary {
  border: 1px solid #7fbcd2;
  color: #7fbcd2;
  font-size: 0.8rem;
  border-radius: 1rem;
  padding: 0.1rem 0.3rem;
}

.tr-hover:hover {
  box-shadow: 4px 3px 5px rgb(206, 206, 206);
  border-radius: 0.3rem;
  opacity: 0.8
}

.btn-hover {
  border: 0;
  background-color: transparent;
  padding: 0.2rem;
  &:hover{
    background-color: rgb(199, 199, 199);
    border-radius: 50%;
  }

}

.vc-week, .vc-weekdays {
  padding: 0.75rem;
}
</style>
