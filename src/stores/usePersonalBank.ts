import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import type { BankAccount } from '@/utilities/types';
import axios from '@/utilities/http';

export const usePersonalBank = defineStore('personalBank', () => {
  const personalBankAccountList = ref<BankAccount[]>([]);
  const userId = localStorage.getItem('userId');
  const url = `/personalBankAccounts?userId=${userId}&_expand=bank`;

  const getBankAccountList = async () => {
    try {
      const res = await axios.get(url);
      console.log(res);
      personalBankAccountList.value = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  onMounted(() => {
    console.log(url);
  });

  return { personalBankAccountList, getBankAccountList };
});
