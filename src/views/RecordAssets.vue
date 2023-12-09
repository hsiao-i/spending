<script setup lang="ts">

import {
  ref, onMounted,
} from 'vue';
import ModalShare from '@/components/ModalShare.vue';
import axios from '@/utilities/http';
import type { BankAccount, Expense } from '@/utilities/types';
import BankAssetUpdate from '@/components/BankAssetUpdate.vue';
import BankAssetDelete from '@/components/BankAssetDelete.vue';

// 開啟 modal
const modalShare = ref();

const updateBankAccount = ref<BankAccount>({
  total: '',
  name: '',
  // date: '',
  bankName: '',
  bankId: 0,
  userId: '',
  autoIncome: 0,
  autoIncomeDate: '',
  autoExpense: 0,
  autoExpenseDate: '',
});
// 開啟 modal 時的狀態
const openModalState = ref('');

const openModal = (state: string, list?: BankAccount) => {
  openModalState.value = state;

  if (state === 'edit') {
    openModalState.value = 'edit';
    updateBankAccount.value = JSON.parse(JSON.stringify(list));
  } else if (state === 'new') {
    openModalState.value = 'new';
    updateBankAccount.value = {
      total: '',
      name: '',
      // date: '',
      bankName: '',
      bankId: 0,
      userId: '',
      autoIncome: 0,
      autoIncomeDate: '',
      autoExpense: 0,
      autoExpenseDate: '',
    };
  } else if (state === 'delete') {
    openModalState.value = 'delete';
    updateBankAccount.value = { ...list! };
  }

  modalShare.value.openModalInComponent();
};

const closeModal = () => {
  modalShare.value.closeModalInComponent();
};

const userId = localStorage.getItem('userId');

// 顯示帳戶列表
const bankAccountList = ref<BankAccount[]>([]);
const getPersonalBankAccount = async () => {
  const url = `/personalBankAccounts?userId=${userId}&_expand=bank`;
  const res = await axios.get(url);
  bankAccountList.value = res.data;
  console.log(bankAccountList.value);
};

const bankAccountId = ref('');
const bankAccountExpenses = ref<Expense[]>([]);
// 取得單一帳戶的所有支出
const getBankAccountExpenses = async () => {
  const url = `expenses?user=${userId}&personalBankAccountId=${bankAccountId.value}&_expand=expenseCategory`;
  console.log(url);
  console.log(bankAccountId.value);
  const res = await axios.get(url);
  bankAccountExpenses.value = res.data;
  console.log(bankAccountExpenses.value);
};
onMounted(() => {
  getPersonalBankAccount();
  getBankAccountExpenses();
});

</script>

<template>
  <ModalShare ref="modalShare">
    <template #record-assets>
      <BankAssetUpdate
        v-if="openModalState === 'edit' || openModalState === 'new'"
        @get-bank-account="getPersonalBankAccount"
        @close-modal="closeModal"
        :account="updateBankAccount"
        :open-state="openModalState"
      />
      <BankAssetDelete
        v-else-if="openModalState === 'delete'"
        :account="updateBankAccount"
        @get-bank-account="getPersonalBankAccount"
        @close-modal="closeModal"
      />
    </template>
  </ModalShare>

  <div class="container">
    <h2>資產管理</h2>
    <div class="row gx-4">
      <div class="col-md-6 mb-3">
        <div class="min-vh-80 max-vh-80 overflow-auto shadow p-4 rounded-4 bg-light">
          <button type="button" class="add-bank btn rounded-4 mb-3 w-100" @click="openModal('new')">+ 新增帳戶</button>
          <ul class="list-unstyled">
            <li class="mb-3 bg-primary-warning-gradient rounded-4  p-3" style="height: 7rem" v-for="list in bankAccountList" :key="list.id">
              <div class="d-flex justify-content-end">
                <!-- <p class=" h5">{{ list.name }}
                  <span class="h6"> ({{ list.bank?.name }})</span>
                </p> -->
                <div>
                  <button type="button" class="btn p-0" @click="openModal('edit', list)">
                    <span class="material-icons-outlined text-light">edit</span>
                  </button>
                  <button type="button" class="btn p-0" @click="openModal('delete', list)">
                    <span class="material-icons-outlined text-light">delete_forever</span>
                  </button>
                </div>
              </div>
              <p class="h5 text-center">{{ list.name }}
                <span class="h6"> ({{ list.bank?.name }})</span>
              </p>
              <!-- <p class="h4 text-center">{{ $toThousandth(list.total) }}</p> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-light shadow rounded-5 p-3 min-vh-80 max-vh-80">
          <h3 class="h5 text-center">帳戶收支查看</h3>
          <div>
            <div class="my-3 d-flex align-items-center">
              <label for="chooseAccount" class="col-2">帳戶</label>
              <select
                class="form-select"
                name="chooseAccount"
                id="chooseAccount"
                v-model="bankAccountId"
                @change="getBankAccountExpenses"
              >
                <option value="" disabled selected>請選擇</option>
                <option
                  v-for="bank in bankAccountList"
                  :key="bank.bankName"
                  :value="bank.id"
                >{{ bank.bankName }}</option>>
              </select>
            </div>
            <div>
              <div class="d-flex text-center border-bottom">
                <h6 class="w-25">時間</h6>
                <h6 class="w-25">類別</h6>
                <h6 class="w-25">名稱</h6>
                <h6 class="w-25">金額</h6>
              </div>
              <div class="overflow-auto">
                <div style="height: 58vh">
                  <div
                    class="d-flex text-center border-bottom py-2"
                    v-for="expense in bankAccountExpenses"
                    :key="expense.uuid"
                  >
                    <h6 class="w-25 mb-0">{{ expense.dateTime.slice(0, 10) }}</h6>
                    <h6 class="w-25 mb-0">{{ expense.expenseCategory?.name }}</h6>
                    <h6 class="w-25 mb-0">{{ expense.name }}</h6>
                    <h6 class="w-25 mb-0">{{ expense.amount }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

  <!-- 保留新增多筆的寫法
    <ModalShare ref="modalShare">
    <template v-slot:record-assets>
      <BankAsset
        v-if="openModalState === 'edit'"
        @get-bank-account="getPersonalBankAccount"
        @close-modal="closeModal"
        :account="updateBankAccount"
        :open-state="openModalState"
      />
      <div v-else-if="openModalState === 'delete'">
        <div class="bg-danger p-3">
          <h3 class="text-white h4">刪除帳戶</h3>
          <div class=" text-end mb-3">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
        </div>
        <div>
          <p>是否確認刪除此銀行帳戶</p>
        </div>

      </div>

    </template>
  </ModalShare> -->

</template>

<style scope lang="scss">
  .add-bank {
    height: 3rem;
    border: 0.2rem dotted;
    background-color: transparent;
    transition: all 0.3s;

    &:hover {
      border: 0.25rem dotted;
      background-color: rgb(221, 220, 220);
    }
  }
  .bg-primary-warning-gradient {
    background: #ffcf72;
background: linear-gradient(140deg, #ffcf72 20%, #cb7d56 100%);
  }

</style>
