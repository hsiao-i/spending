<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue';
import type { Expense } from '@/utilities/types';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { usePersonalBank } from '@/stores/usePersonalBank';
import { useSpendingStore } from '@/stores/useSpendingStore';
import axios from '@/utilities/http';
import Swal from 'sweetalert2';
// import { onMounted } from 'vue';
// import CategoryIconView from './CategoryIconView.vue';
// const

// 同時取出 store.categoryIcon
const store = useCategoryStore();
const bankStore = usePersonalBank();
const spendingStore = useSpendingStore();
onMounted(() => {
  store.getExpenseCategories();
  store.getIncomeCategories();
  bankStore.getBankAccountList();
  // console.log(store.categoryIcon);
});
// const categories = ref<CategoryIcon[]>(store.categoryIcon);

const props = defineProps<{
  updateExpense: Expense;
}>();
const { updateExpense } = toRefs(props);

// 將日期格式轉換為 YYYY-MM-DD，input type="date" 才能顯示
const formatDate = () => {
  updateExpense.value.date = new Date().toISOString().slice(0, 10);
};
onMounted(() => {
  formatDate();
  spendingStore.formatDate();
});

const emit = defineEmits(['closeModal']);
const expenseForm = ref();
const incomeForm = ref();

// 新增、編輯 expense
const updateExpenseInfo = async () => {
  try {
    const userId = localStorage.getItem('userId');
    updateExpense.value.userId = userId;

    const url = '/expenses';
    const res = await axios.post(url, updateExpense.value);
    console.log(updateExpense.value);
    console.log(res);
    Swal.fire({
      icon: 'success',
      title: '成功記錄',
      confirmButtonColor: '#7fbcd2',
    });
    emit('closeModal');
    expenseForm.value.resetForm();
    spendingStore.getExpense();
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: '失敗，請再次操作或連繫管理員',
      confirmButtonColor: '#cb7d56',
    });
  }
};

// const addMultipleExpense

</script>

<template>
  <div name="single-record" class="tab-content px-4" id="expenseTabContent">
    <!-- 收入 modal -->
    <div class="tab-pane fade show active" id="tabExpense" role="tabpanel" aria-labelledby="home-tab">
      <!-- <div class="row row-cols-5">
        <CategoryIconView
          class="col mb-2"
          v-for="category in store.categoryIcon"
          :key="category.id"
          :category="category"
        />
      </div> -->
      <VForm v-slot="{ errors }" @submit="updateExpenseInfo" ref="expenseForm">
        <div class=" mb-3">
          <label for="recordInputDate" class="form-label">日期</label>
          <input
            type="date"
            class="form-control"
            id="recordInputDate"
            aria-describedby="dateHelp"
            v-model="updateExpense.date"
          >
        </div>
        <div class="mb-3">
          <label for="銀行帳戶" class="form-label">銀行帳戶</label>
          <VField
            name="銀行帳戶"
            id="recordExpenseBank"
            placeholder="請選擇使用的銀行帳戶"
            class="form-select"
            :class="{ 'is-invalid': errors['銀行帳戶'] }"
            rules="required"
            as="select"
            v-model="updateExpense.personalBankAccountId"
          >
            <option value="" disabled selected>請選擇使用的銀行帳戶</option>
            <option
              v-for="account in bankStore.personalBankAccountList"
              :key="account.id"
              :value="account.id">
              {{ account.bank?.name }}
            </option>
          </VField>
          <ErrorMessage
            name="銀行帳戶"
            class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="類別" class="form-label">類別</label>
          <VField
            name="類別"
            id="recordExpenseCategory"
            placeholder="請選擇類別"
            class="form-select"
            :class="{ 'is-invalid': errors['類別'] }"
            rules="required"
            as="select"
            v-model="updateExpense.expenseCategoryId"
          >
            <option value="" disabled selected>請選擇類別</option>
            <option
              :value="category.id"
              v-for="category in store.categoryIcon"
              :key="category.id">
              {{ category.name }}
            </option>
          </VField>
          <ErrorMessage
            name="類別"
            class="invalid-feedback" />

        </div>
        <div class="mb-3 row">
          <div class=" col-8">
            <label for="recordInputName" class="form-label">名稱</label>
            <input
              type="text"
              class="form-control"
              id="recordInputName"
              aria-describedby="nameHelp"
              placeholder="請輸入名稱"
              v-model="updateExpense.name"
            >
          </div>
          <div class="col-4">
            <label for="金額" class="form-label">金額</label>
            <VField
              type="number"
              class="form-control"
              name="金額"
              id="recordInputPrice"
              placeholder="輸入金額"
              :class="{ 'is-invalid': errors['金額'] }"
              rules="required"
              v-model="updateExpense.amount"
            />
            <ErrorMessage name="金額" class="invalid-feedback" />
          </div>
        </div>
        <div class="mb-3">
          <label for="recordTextarea" class="form-label">備註</label>
          <textarea
            class="form-control"
            placeholder="備註"
            id="recordTextarea"
            style="height: 100px"
            v-model="updateExpense.description"
          />
        </div>

        <div class="py-4">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="Object.keys(errors).length > 0"
          >儲存</button>
        </div>
      </VForm>
    </div>

    <!-- 支出 modal -->
    <div class="tab-pane fade" id="tabIncome" role="tabpanel" aria-labelledby="profile-tab">
      <VForm v-slot="{ errors }" @submit="spendingStore.updateIncomeInfo" ref="incomeForm">
        <div class="mb-3">
          <label for="recordInputDate" class="form-label">日期</label>
          <input
            type="date"
            class="form-control"
            id="recordInputDate"
            aria-describedby="dateHelp"
            v-model="spendingStore.updateIncomeData.date"
          >
        </div>
        <div class="mb-3">
          <label for="銀行帳戶" class="form-label">銀行帳戶</label>
          <VField
            name="銀行帳戶"
            id="recordExpenseBank"
            placeholder="請選擇使用的銀行帳戶"
            class="form-select"
            :class="{ 'is-invalid': errors['銀行帳戶'] }"
            rules="required"
            as="select"
            v-model="spendingStore.updateIncomeData.personalBankAccountId"
          >
            <option value="" disabled selected>請選擇使用的銀行帳戶</option>
            <option
              v-for="account in bankStore.personalBankAccountList"
              :key="account.id"
              :value="account.id">
              {{ account.bank?.name }}
            </option>
          </VField>
          <ErrorMessage
            name="銀行帳戶"
            class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="類別" class="form-label">類別</label>
          <VField
            name="類別"
            id="recordExpenseCategory"
            placeholder="請選擇類別"
            class="form-select"
            :class="{ 'is-invalid': errors['類別'] }"
            rules="required"
            as="select"
            v-model="spendingStore.updateIncomeData.incomeCategoryId"
          >
            <option value="" disabled selected>請選擇類別</option>
            <option
              :value="category.id"
              v-for="category in store.categoryIncome"
              :key="category.id">
              {{ category.name }}
            </option>
          </VField>
          <ErrorMessage
            name="類別"
            class="invalid-feedback" />

        </div>
        <div class="mb-3 row">
          <div class=" col-8">
            <label for="recordInputName" class="form-label">名稱</label>
            <input
              type="text"
              class="form-control"
              id="recordInputName"
              aria-describedby="nameHelp"
              placeholder="請輸入名稱"
              v-model="spendingStore.updateIncomeData.name"
            >
          </div>
          <div class="col-4">
            <label for="金額" class="form-label">金額</label>
            <VField
              type="number"
              class="form-control"
              name="金額"
              id="recordInputPrice"
              placeholder="輸入金額"
              :class="{ 'is-invalid': errors['金額'] }"
              rules="required"
              v-model="spendingStore.updateIncomeData.amount"
            />
            <ErrorMessage name="金額" class="invalid-feedback" />
          </div>
        </div>
        <div class="mb-3">
          <label for="recordTextarea" class="form-label">備註</label>
          <textarea
            class="form-control"
            placeholder="備註"
            id="recordTextarea"
            style="height: 100px"
            v-model="spendingStore.updateIncomeData.description"
          />
        </div>

        <div class="py-4">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="Object.keys(errors).length > 0"
          >儲存</button>
        </div>
      </VForm>
    </div>
  </div>
</template>
