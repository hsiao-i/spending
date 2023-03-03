<script setup lang="ts">
import {
  ref, computed, onMounted, watch,
} from 'vue';
import type { BankAccount, Bank } from '@/utilities/types';
import axios from '@/utilities/http';
// import { useModalStore } from '@/stores/useModalStore';

// const store = useModalStore();
// 取得銀行列表
const banks = ref<Bank[]>([]);
const getBanksList = async () => {
  try {
    const url = '/banks';
    const res = await axios.get(url);
    banks.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
onMounted(() => {
  getBanksList();
});

// 從 datalist 取得 bankId
const selectedBankName = ref('');
const selectedBankId = computed(() => {
  const bank = banks.value.find((bankInfo) => bankInfo.name === selectedBankName.value);
  return bank ? bank.id : null;
});

// 新增帳戶
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
});

// 監聽，為了取得 bankId
watch(selectedBankId, () => {
  account.value.bankId = selectedBankId.value;
});

// 清空表單設置
const formClear = ref();

const emit = defineEmits(['getBankAccount', 'closeModal']);
// 新增銀行帳戶
const addBankAccount = async () => {
  try {
    account.value.userId = localStorage.getItem('userId');
    const url = '/personalBankAccounts';
    const res = await axios.post(url, account.value);
    console.log(account.value);
    console.log(res);
    alert('成功建立帳戶');
    formClear.value.resetForm();
    // store.closeModal();
    // emit();
    emit('closeModal');
    emit('getBankAccount');
    // getPersonalBankAccount();
  } catch (err) {
    console.log(err);
  }
};
const click = () => {
  emit('closeModal');
};

</script>

<template>
  <button type="button" @click="click">test</button>
  <div class="p-4">
    <div class=" text-end mb-3">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
    </div>
    <h3 class="h4 mb-3">新增帳戶</h3>

    <Form v-slot="{ errors }" @submit="addBankAccount" ref="formClear">
      {{ errors }}
      <div class="mb-3">
        <label for="帳戶名稱" class="form-label">帳戶名稱</label>
        <Field
          type="text"
          class="form-control"
          id="帳戶名稱"
          placeholder="為帳戶取一個名稱"
          name="帳戶名稱"
          :class="{ 'is-invalid': errors['帳戶名稱'] }"
          rules="required"
          v-model="account.name"
        />
        <ErrorMessage name="帳戶名稱" class="invalid-feedback" />
      </div>
      <div class="mb-3">
        <label for="帳戶初始金額" class="form-label">帳戶初始金額</label>
        <Field
          type="number"
          class="form-control"
          id="recordBankAmount"
          placeholder="設定帳戶初始金額"
          name="帳戶初始金額"
          :class="{ 'is-invalid': errors['帳戶初始金額'] }"
          rules="required"
          v-model="account.total"
        />
        <ErrorMessage name="帳戶初始金額" class="invalid-feedback" />

      </div>
      <div class="mb-3">
        <label for="使用銀行" class="form-label">使用銀行</label>
        <Field
          type="text"
          list="recordAssetBank"
          class="form-select"
          id="使用銀行"
          name="使用銀行"
          placeholder="請選擇此帳戶使用的銀行"
          :class="{ 'is-invalid': errors['使用銀行'] }"
          rules="required"
          v-model="selectedBankName"
        />
        <datalist id="recordAssetBank">
          <option v-for="bank in banks" :key="bank.code" :value="bank.name">{{ `${bank.code} ${bank.name}` }}</option>
        </datalist>
        <ErrorMessage name="使用銀行" class="invalid-feedback" />
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
      <div class="py-4">
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="Object.keys(errors).length > 0 || selectedBankName === '' ">
          儲存
        </button>
      </div>
    </Form>
  </div>
</template>
