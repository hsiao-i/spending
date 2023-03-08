<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
  // totalStore.calculateTotal();
  // console.log(spendingStore.expenseList);
  console.log(totalStore.monthBankTotal);
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

    // if (expenseIncome === 'expense' || expenseIncome === 'income') {

    console.log(expenseOrIncome.value);
    // }
  }

  modalShare.value.openModalInComponent();
};
const closeModal = () => {
  modalShare.value.closeModalInComponent();
};

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 ">
        <div class="h-75 overflow-auto shadow p-4 rounded-4">

          <h4>帳戶總額</h4>
          <ul class="list-unstyled">
            <li class="mb-3 bg-light rounded-4 shadow p-3" style="height: 7rem" v-for="list in bankStore.personalBankAccountList" :key="list.id">
              <p class=" h5">{{ list.name }}
                <span class="h6"> ({{ list.bank?.name }})</span>
              </p>
              <p class="h4 text-center">{{ list.total }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-light shadow rounded-3 p-4 h-75 overflow-auto">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary" @click="openModal('single')">+ 記錄單筆</button>
            <button type="button" class="btn btn-outline-primary" @click="openModal('multiple')">+ 記錄多筆 </button>
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
                <tr v-for="expense in spendingStore.expenseList" :key="expense.uuid" role="button" class="tr-hover">
                  <td>{{ expense.expenseCategory?.name }}</td>
                  <td>{{ expense.name }}</td>
                  <td class="text-end"> <span class="text-danger">
                                          $ {{ expense.amount }}</span> <br>
                    <span class="h6 mb-0 badge-blue-outline">{{ expense.personalBankAccount?.bankName }}</span>
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
                <tr v-for="income in spendingStore.incomeList" :key="income.uuid" role="button" class="tr-hover">
                  <td>{{ income.incomeCategory?.name }}</td>
                  <td>{{ income.name }}</td>
                  <td class="text-end"> <span class="text-success">
                                          $ {{ income.amount }}</span> <br>
                    <span class="h6 mb-0 badge-blue-outline">{{ income.personalBankAccount?.bankName }}</span>
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
                <!-- <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr> -->
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
.badge-blue-outline {
  border: 1px solid rgb(0, 225, 255);
  color: rgb(0, 225, 255);
  font-size: 0.8rem;
  border-radius: 1rem;
  padding: 0.1rem 0.3rem;
  /* background-color: ; */
}

// .edit-button {
//   display: none;
//   left: 35%;
//   top: 15%;
//   opacity: 1;
// }

.tr-hover:hover {
  // background: rgba(250, 235, 215);
  box-shadow: 4px 3px 5px rgb(206, 206, 206);
  border-radius: 0.3rem;
  opacity: 0.8
  // opacity: 0.3;

}
.btn-hover {
  border: 0;
  background-color: transparent;
  padding: 0.2rem;
  &:hover{
    background-color: rgb(199, 199, 199);
    border-radius: 50%;
    // padding: 0.1rem;
  }

}
</style>
