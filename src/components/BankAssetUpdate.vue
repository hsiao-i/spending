<script setup lang="ts">
import {
  ref, computed, onMounted, watch, toRefs,
} from 'vue';
import type { BankAccount, Bank } from '@/utilities/types';
import axios from '@/utilities/http';

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
  console.log('新增帳戶');
});

// 從外層取得帳戶資訊、開啟狀態
const props = defineProps<{
  account: BankAccount,
  openState: string
}>();
const { account, openState } = toRefs(props);

// 取得 bankId
const selectedBankId = computed(() => {
  const bank = banks.value.find((bankInfo) => bankInfo.name === account.value.bankName);
  return bank ? bank.id : null;
});

// 新增帳戶
// const account = ref<BankAccount>({
//   total: '',
//   name: '',
//   // date: '',
//   bankId: 0,
//   userId: '',
//   autoIncome: 0,
//   autoIncomeDate: '',
//   autoExpense: 0,
//   autoExpenseDate: '',
// });

// 監聽，為了取得 bankId
watch(selectedBankId, () => {
  account.value.bankId = selectedBankId.value;
});

// 清空表單設置
const formClear = ref();

// 新增、編輯銀行帳戶
const emit = defineEmits(['getBankAccount', 'closeModal']);

const addBankAccount = async () => {
  try {
    account.value.userId = localStorage.getItem('userId');
    let url = '/personalBankAccounts';
    let request: 'post' | 'put' = 'post';
    let situation = '成功新增帳戶';

    if (openState.value === 'edit') {
      url = `/personalBankAccounts/${account.value.id}`;
      request = 'put';
      situation = '成功更新帳戶';
    }
    await axios[request](url, account.value);
    alert(situation);
    formClear.value.resetForm();
    emit('closeModal');
    emit('getBankAccount');
  } catch (err) {
    console.log(err);
  }
};

</script>

<template>
  <div class="p-4">
    <div class=" text-end mb-3">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
    </div>
    <h3 class="h4 mb-3">
      <span v-if="openState === 'new'">新增</span>
      <span v-else-if="openState === 'edit'">編輯</span>帳戶
    </h3>

    <Form v-slot="{ errors }" @submit="addBankAccount" ref="formClear">
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
          v-model="account.bankName"
        />
        <datalist id="recordAssetBank">
          <option v-for="bank in banks" :key="bank.code" :value="bank.name">{{ `${bank.code} ${bank.name}` }}</option>
        </datalist>
        <ErrorMessage name="使用銀行" class="invalid-feedback" />
      </div>
      <!-- {{ selectedBankId }} -->
      <!-- <div class="mb-3 row">
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
      </div> -->
      <div class="py-4">
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="Object.keys(errors).length > 0">
          儲存
        </button>
      </div>
    </Form>
  </div>
</template>
