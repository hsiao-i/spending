<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import ModalShare from '@/components/ModalShare.vue';
  import axios from '@/utilities/http'
// import { Axios } from 'axios';

  // 開啟 modal
  const modalShare = ref()
  const openModal = () => {
    modalShare.value.openModalInComponent()
  }

  // 取得銀行列表
  interface Bank {
    id: number;
    code: string;
    name: string;
  }
  const banks = ref<Bank[]>([])
  const getBanksList = async () => {
    try {
      const url = '/banks'
      const res = await axios.get(url)
      banks.value = res.data
    } catch(err) {
      console.log(err);
    }
  }
  onMounted(() => {
    getBanksList()
  })

  // 從 datalist 取得 bankId
  const selectedBankName = ref('')
  const selectedBankId = computed(() => {
    const bank = banks.value.find(bank => bank.name === selectedBankName.value)
    return bank ? bank.id : null
  })
  watch(selectedBankId, () => {
    account.value.bankId = selectedBankId.value
  })

  // 新增帳戶
  interface BankAccount {
    total: number | string;
    name: string;
    // date: string;
    bankId: number | null;
    userId: number;
    autoIncome?: number;
    autoIncomeDate?: string;
    autoExpense?: number;
    autoExpenseDate?: string;

  }
  const account = ref<BankAccount>({
    total: '',
    name: '',
    // date: '',
    bankId: 0,
    userId: 0,
    autoIncome: 0,
    autoIncomeDate: '',
    autoExpense: 0,
    autoExpenseDate: '',
  })
  
  
  const addAccount = async () => {
    try {
      // const url = '/personalBankAccounts'
      // const res = await axios.post(url, account)
      console.log(account.value);
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }
  
  onMounted(() => {
    // addAccount()
  })

</script>

<template>
  <h2>資產管理</h2>
  <button type="button" class="btn btn-primary" @click="openModal">＋ 新增帳戶</button>
  <ModalShare ref="modalShare">
    <template v-slot:record-assets>
      <div class="p-4">
        <div class=" text-end mb-3">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <h3 class="h4 mb-3">新增帳戶</h3>
        <form>             
          <!-- <div class="mb-3">
            <label for="recordInputDate" class="form-label">日期</label>
            <input type="date" class="form-control" id="recordInputDate"
            v-model="account.date">
            
          </div> -->
          <div class="mb-3"> 
            <label for="recordAssetName" class="form-label">帳戶名稱</label>
            <input type="text" class="form-control" id="recordAssetName" placeholder="為帳戶取一個名稱"
            v-model="account.name"
            >     
          </div>
          <div class="mb-3">
            <label for="recordBankAmount" class="form-label">帳戶初始金額</label>
            <input type="number" class="form-control" id="recordBankAmount" placeholder="設定帳戶初始金額"
            v-model="account.total"
            > 

          </div>
          <div class="mb-3">
            <label for="recordAssetBank" class="form-label">使用銀行</label>
            <input type="text" list="recordAssetBank" class="form-select" name="recordAssetBank" placeholder="請選擇此帳戶使用的銀行"
            v-model="selectedBankName"
            
            >
            <datalist id="recordAssetBank">
              <option v-for="bank in banks" :key="bank.code" :value="bank.name">{{ `${bank.code} ${bank.name}` }}</option>
            </datalist>
          </div>
          {{ selectedBankId }}
          <div class="mb-3 row">
            <div class=" col-6">
              <label for="recordAssetAutoAmount" class="form-label">每月固定收入金額</label>
              <input type="number" class="form-control" id="recordAssetAutoAmount" aria-describedby="nameHelp" placeholder="請輸入金額">
            </div>
            <div class="col-6">
              <label for="recordAssetAutoDate" class="form-label">每月自動收入日期</label>
              <select name="recordAssetAutoDate" id="recordAssetAutoDate" class="form-select">
                <option value="" selected disabled>選擇日期 (1-28)</option>
                <option v-for="date in 28" :key="date" :value="date">{{ date }}</option>
              </select>
            </div>               
          </div>
          <div class="mb-3 row">
            <div class=" col-6">
              <label for="recordAssetAutoExpense" class="form-label">每月固定支出金額</label>
              <input type="number" class="form-control" id="recordAssetAutoExpense" aria-describedby="nameHelp" placeholder="請輸入金額">
            </div>
            <div class="col-6">
              <label for="recordAssetAutoExpenseDate" class="form-label">每月自動支出日期</label>
              <select name="recordAssetAutoExpenseDate" id="recordAssetAutoExpenseDate" class="form-select">
                <option value="" selected disabled>選擇日期 (1-28)</option>
                <option v-for="date in 28" :key="date" value="date">{{ date }}</option>
              </select>
            </div>               
          </div>
          <!-- <div class="mb-3">
            <label for="recordAssetTextarea" class="form-label">備註</label>
            <textarea class="form-control" placeholder="備註" id="recordAssetTextarea" style="height: 100px"></textarea>
          </div> -->

          <div class="py-4">
            <!-- <button type="button" class="btn btn-outline-secondary w-20 me-3" data-bs-dismiss="modal">取消</button> -->
            <button type="button" class="btn btn-primary w-100" @click="addAccount
            ">儲存</button>
          </div>     
        </form> 
      </div>
    </template>
  </ModalShare>
</template>