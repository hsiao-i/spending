<script setup lang="ts">
import type { Expense } from '@/utilities/types';
import { ref, toRefs, onMounted } from 'vue';
import { usePersonalBank } from '@/stores/usePersonalBank';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useSpendingStore } from '@/stores/useSpendingStore';
import axios from '@/utilities/http';

const bankStore = usePersonalBank();
const categoryStore = useCategoryStore();
const spendingStore = useSpendingStore();
onMounted(() => {
  bankStore.getBankAccountList();
  categoryStore.getExpenseCategories();
  categoryStore.getIncomeCategories();
});

const props = defineProps<{
  updateExpense: Expense;
  expenseOrIncome: string;
}>();
const { updateExpense } = toRefs(props);

const emit = defineEmits(['closeModal']);
const spendingEditForm = ref();

// 新增、編輯 expense
const updateExpenseInfo = async () => {
  try {
    const userId = localStorage.getItem('userId');
    updateExpense.value.userId = userId;

    const url = `/expenses/${updateExpense.value.id}`;
    const res = await axios.put(url, updateExpense.value);
    console.log(updateExpense.value);
    console.log(res);
    alert('成功更新');
    emit('closeModal');
    spendingEditForm.value.resetForm();
    spendingStore.getExpense();
  } catch (err) {
    console.log(err);
  }
};

const updateIncomeInfo = () => {
  spendingStore.requestState = 'edit';
  spendingStore.updateIncomeInfo();
  spendingEditForm.value.resetForm();
  emit('closeModal');
};
</script>

<template>
  <div class="p-4">
    <div class=" text-end mb-3">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
    </div>
    <h3 class="h4 mb-3">編輯紀錄</h3>
    <template v-if="expenseOrIncome === 'expense'">
      {{ expenseOrIncome }}
      <Form v-slot="{ errors }" @submit="updateExpenseInfo" ref="spendingEditForm">
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
          <Field
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
          </Field>
          <ErrorMessage
            name="銀行帳戶"
            class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="類別" class="form-label">類別</label>
          <Field
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
              v-for="category in categoryStore.categoryIcon"
              :key="category.id">
              {{ category.name }}
            </option>
          </Field>
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
            <Field
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
      </Form>
    </template>
    <template v-else-if="expenseOrIncome === 'income'">
      {{ expenseOrIncome }}
      <Form v-slot="{ errors }" @submit="updateIncomeInfo" ref="spendingEditForm">
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
          <Field
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
          </Field>
          <ErrorMessage
            name="銀行帳戶"
            class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="類別" class="form-label">類別</label>
          <Field
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
              v-for="category in categoryStore.categoryIncome"
              :key="category.id">
              {{ category.name }}
            </option>
          </Field>
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
            <Field
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
      </Form>
    </template>

  </div>
</template>
