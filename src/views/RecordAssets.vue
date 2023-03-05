<script setup lang="ts">

import {
  ref, onMounted,
} from 'vue';
import ModalShare from '@/components/ModalShare.vue';
import axios from '@/utilities/http';
import type { BankAccount } from '@/utilities/types';
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

const openModal = (state: string, list: BankAccount) => {
  openModalState.value = state;

  if (state === 'edit') {
    console.log(list);
    openModalState.value = 'edit';
    updateBankAccount.value = JSON.parse(JSON.stringify(list));
  } else if (state === 'new') {
    console.log(state);
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
    updateBankAccount.value = { ...list };
  }

  modalShare.value.openModalInComponent();
};

const closeModal = () => {
  modalShare.value.closeModalInComponent();
};

// 顯示帳戶列表
const bankAccountList = ref<BankAccount[]>([]);
const getPersonalBankAccount = async () => {
  const userId = localStorage.getItem('userId');
  const url = `/personalBankAccounts?userId=${userId}&_expand=bank`;
  const res = await axios.get(url);
  bankAccountList.value = res.data;
  console.log(res.data);
};
onMounted(() => {
  getPersonalBankAccount();
});

</script>

<template>
  <h2>資產管理</h2>
  <button type="button" class="btn btn-primary" @click="openModal('new', updateBankAccount)">＋ 新增帳戶</button>
  <div class="container">
    <div class="row">
      <div class="col-3 mb-3">
        <button type="button" class="add-bank btn rounded-4 mb-3 w-100" style="height: 8rem" @click="openModal('new')">+ 新增帳戶</button>
      </div>

      <div class="col-3 mb-3" v-for="list in bankAccountList" :key="list.id">
        <div class="bg-light rounded-4 shadow p-3" style="height: 8rem">
          <div class="d-flex justify-content-between">
            <p class="h5">{{ list.name }} </p>
            <div>
              <button type="button" class="btn p-0" @click="openModal('edit', list)">
                <span class="material-icons-outlined text-secondary">edit</span>
              </button>
              <button type="button" class="btn p-0" @click="openModal('delete', list)">
                <span class="material-icons-outlined text-secondary">delete_forever</span>
              </button>
            </div>
          </div>
          <p>
            <span class="h6"> ({{ list.bank?.name }})</span>
          </p>
          <p class="h4">{{ list.total }}</p>
        </div>
      </div>
    </div>
  </div>
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
    <div class="row gx-4">
      <div class="col-md-6">
        <div class="bg-light shadow rounded-5 p-3 min-vh-80">
          左邊 detail list
        </div>
      </div>
      <div class="col-md-6">
        <div class="min-vh-80 overflow-auto shadow p-4 rounded-4">
          <button type="button" class="add-bank btn rounded-4 mb-3 w-100">+ 新增帳戶</button>
          <ul class="list-unstyled">
            <li class="mb-3 bg-light rounded-4 shadow p-3" style="height: 7rem" v-for="list in bankAccountList" :key="list.id">
              <p class=" h5">{{ list.name }}
                <span class="h6"> ({{ list.bank?.name }})</span>
              </p>
              <p class="h4 text-center">{{ list.total }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- <ModalShare ref="modalShare">
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
    height: 5rem;
    border: 0.25rem dotted;
    background-color: transparent;
    transition: all 0.3s;

    &:hover {
      border: 0.25rem dotted;
      background-color: rgb(221, 220, 220);
    }
  }

</style>
