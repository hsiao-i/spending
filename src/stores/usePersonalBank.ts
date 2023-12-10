import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BankAccount } from '@/utilities/types';
import axios from '@/utilities/http';
import Swal from 'sweetalert2';

export const usePersonalBank = defineStore('personalBank', () => {
  const personalBankAccountList = ref<BankAccount[]>([]);
  const userId = localStorage.getItem('userId');
  const url = `/personalBankAccounts?userId=${userId}&_expand=bank`;

  const getBankAccountList = async () => {
    try {
      const res = await axios.get(url);
      personalBankAccountList.value = res.data;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '錯誤，請聯繫管理員',
      });
    }
  };

  return { personalBankAccountList, getBankAccountList };
});
