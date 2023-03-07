<script setup lang="ts">
import { toRefs } from 'vue';
import type { Expense } from '@/utilities/types';
import axios from '@/utilities/http';
import { useSpendingStore } from '@/stores/useSpendingStore';

const spendingStore = useSpendingStore();

const emit = defineEmits(['closeModal']);
const props = defineProps<{
  updateExpense: Expense;
  expenseOrIncome: string;
}>();
const { updateExpense } = toRefs(props);
const deleteSpending = async () => {
  try {
    const url = `/expenses/${updateExpense.value.id}?_noRemoveDependents=true`;
    const res = await axios.delete(url);
    console.log(res);
    emit('closeModal');
    spendingStore.getExpense();
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="bg-danger p-3 d-flex justify-content-between rounded-top">

    <h3 class="text-white h4 mb-0">刪除紀錄</h3>
    <div>
      <button type="button" class="btn-close btn-light" data-bs-dismiss="modal" aria-label="Close" />
    </div>
  </div>
  <div class="p-4">
    <p>是否確認刪除此筆記錄？</p>
    <p class="h6">名稱：<span class="text-danger">{{ updateExpense.name }}</span> </p>
    <p class="h6">銀行帳戶：<span class="text-danger">{{ updateExpense.personalBankAccount?.bankName }}</span></p>
    <p class="h6">金額：<span class="text-danger">{{ updateExpense.amount }}</span></p>
    <div class="text-end">
      <button type="button" class="btn btn-danger w-25" @click="deleteSpending">刪除</button>
    </div>
  </div>
</template>
