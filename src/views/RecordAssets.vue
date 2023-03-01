<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import ModalShare from '@/components/ModalShare.vue';
  import axios from '@/utilities/http'

  // 開啟 modal
  const modalShare = ref()
  const openModal = () => {
    modalShare.value.openModalInComponent()
  }
  const closeModal = () => {
    modalShare.value.closeModalInComponent()
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
    id?: number;
    total: number | string;
    name: string;
    // date: string;
    bankId: number | null;
    userId: string | null;
    bank?: Bank;
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
    userId: '',
    autoIncome: 0,
    autoIncomeDate: '',
    autoExpense: 0,
    autoExpenseDate: '',
  })

  // 清空表單設置
  const formClear = ref()

  const addBankAccount = async () => {
    try {
      account.value.userId = localStorage.getItem('userId')
      const url = '/personalBankAccounts'
      const res = await axios.post(url, account.value)
      console.log(account.value);
      console.log(res);
      alert('成功建立帳戶')
      formClear.value.resetForm()
      closeModal()
    } catch(err) {
      console.log(err);
    }
  }

  
  // 顯示帳戶列表
  const bankAccountList = ref<BankAccount[]>([])
  const getPersonalBankAccount = async () => {
    const userId = localStorage.getItem('userId')
    const url = `/personalBankAccounts?userId=${userId}&_expand=bank`
    const res = await axios.get(url)
    bankAccountList.value = res.data
  }
  onMounted(() => {
    getPersonalBankAccount()
  })

</script>

<template>
  <h2>資產管理</h2>
  <button type="button" class="btn btn-primary" @click="openModal">＋ 新增帳戶</button>

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
              <p class="mb-0 h5">{{ list.name }} 
                <span class="h6"> ({{ list.bank?.name }})</span> 
              </p>

              <p class="h4 text-center">{{ list.total }}</p>
            </li>
            
          </ul>
          
          
          </div>
        
      </div>
    </div>
  </div>
  
  <ModalShare ref="modalShare">
    <template v-slot:record-assets>
      <div class="p-4">
        <div class=" text-end mb-3">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <h3 class="h4 mb-3">新增帳戶</h3>

        <Form v-slot="{ errors }" @submit="addBankAccount" ref="formClear">
          {{ errors }}
          <div class="mb-3"> 
            <label for="帳戶名稱" class="form-label">帳戶名稱</label>
            <Field type="text" class="form-control" id="帳戶名稱" placeholder="為帳戶取一個名稱" name="帳戶名稱"
            :class="{ 'is-invalid': errors['帳戶名稱'] }"
            rules="required"
            v-model="account.name"
            ></Field>
            <ErrorMessage name="帳戶名稱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="帳戶初始金額" class="form-label">帳戶初始金額</label>
            <Field type="number" class="form-control" id="recordBankAmount" placeholder="設定帳戶初始金額" name="帳戶初始金額"
            :class="{ 'is-invalid': errors['帳戶初始金額'] }"
            rules="required"
            v-model="account.total"
            ></Field>
            <ErrorMessage name="帳戶初始金額" class="invalid-feedback"></ErrorMessage>

          </div>
          <div class="mb-3">
            <label for="使用銀行" class="form-label">使用銀行</label>
            <Field type="text" list="recordAssetBank" class="form-select" id="使用銀行" name="使用銀行" placeholder="請選擇此帳戶使用的銀行"
            :class="{ 'is-invalid': errors['使用銀行'] }"
            rules="required"
            v-model="selectedBankName"          
            ></Field>
            <datalist id="recordAssetBank">
              <option v-for="bank in banks" :key="bank.code" :value="bank.name">{{ `${bank.code} ${bank.name}` }}</option>
            </datalist>
            <ErrorMessage name="使用銀行" class="invalid-feedback"></ErrorMessage>
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
            <button type="submit" 
            class="btn btn-primary w-100"             
            :disabled="Object.keys(errors).length > 0 || selectedBankName === '' ">
              儲存
            </button>
          </div>     
        </Form> 
      </div>
    </template>
  </ModalShare>
</template>

<style scope lang="scss">
  .add-bank {

    height: 5rem;
    border: 0.25rem dotted;
    background-color: transparent;
    
    &:hover {
    background-color: rgb(221, 220, 220)
  }

  }
  

</style>