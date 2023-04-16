import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BankAccount } from '@/utilities/types';
import axios from '@/utilities/http';

export const usePersonalBank = defineStore('personalBank', () => {
  const personalBankAccountList = ref<BankAccount[]>([]);
  const userId = localStorage.getItem('userId');
  const url = `/personalBankAccounts?userId=${userId}&_expand=bank`;

  const getBankAccountList = async () => {
    try {
      const res = await axios.get(url);
      personalBankAccountList.value = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return { personalBankAccountList, getBankAccountList };
});
