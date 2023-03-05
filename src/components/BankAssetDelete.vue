<script setup lang="ts">
import type { BankAccount } from '@/utilities/types';
// import axios from '@/utilities/http';
import { toRefs } from 'vue';

const props = defineProps<{
  account: BankAccount
}>();
const { account } = toRefs(props);

const emit = defineEmits(['getBankAccount', 'closeModal']);

const deleteBankAccount = async () => {
  console.log(account.value.id);
  try {
    const url = `/personalBankAccounts/${account.value.id}`;
    // const res = await axios.delete(url);
    // console.log(res);

    // const fetchOpt: Fetch = { method: 'delete', mode: 'cors', cache: 'no-cache' };
    const res = await fetch(`http://localhost:3000${url}`, { method: 'delete', mode: 'cors', cache: 'no-cache' });
    const data = res.json();
    console.log(data);
    emit('closeModal');
    emit('getBankAccount');
  } catch (err) {
    console.log(err);
  }
};

</script>

<template>
  <div class="bg-danger p-3 d-flex justify-content-between rounded-top">

    <h3 class="text-white h4 mb-0">刪除帳戶</h3>
    <div>
      <button type="button" class="btn-close btn-light" data-bs-dismiss="modal" aria-label="Close" />
    </div>
  </div>
  <div class="p-4">
    <p>是否確認刪除此銀行帳戶？</p>
    <p class="h6">帳戶名稱：<span class="text-danger">{{ account.name }}</span> </p>
    <p class="h6">帳戶總額：<span class="text-danger">{{ account.total }}</span></p>
    <div class="text-end">
      <button type="button" class="btn btn-danger w-25" @click="deleteBankAccount">刪除</button>
    </div>
  </div>
</template>
