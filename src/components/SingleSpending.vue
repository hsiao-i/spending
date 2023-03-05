<script setup lang="ts">
import { toRefs, onMounted } from 'vue';
// import { v4 as uuidv4 } from 'uuid';
import type { Expense } from '@/utilities/types';

import { useCategoryStore } from '@/stores/useCategoryStore';
import { usePersonalBank } from '@/stores/usePersonalBank';
// import { onMounted } from 'vue';
// import CategoryIconView from './CategoryIconView.vue';
// const

// 同時取出 store.categoryIcon
const store = useCategoryStore();
const bankStore = usePersonalBank();
onMounted(() => {
  store.getExpenseCategories();
  bankStore.getBankAccountList();
  // console.log(store.categoryIcon);
});
// const categories = ref<CategoryIcon[]>(store.categoryIcon);

const props = defineProps<{
  updateExpense: Expense;
}>();
const { updateExpense } = toRefs(props);

const updateExpenseInfo = () => {
  console.log(updateExpense.value);
};
// onMounted(() => {
//   console.log(updateExpense.value.categoryId);
// });

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
      <Form v-slot="{ errors }">
        <div class=" mb-3">
          <!-- <label for="recordInputDate" class="form-label">日期</label>
          <input type="date"
            class="form-control"
            id="recordInputDate"
            aria-describedby="dateHelp"
            v-model="updateExpense.dateTime"
          > -->
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
            v-model="updateExpense.personalBankId"
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
            class="form-select"
            :class="{ 'is-invalid': errors['類別'] }"
            rules="required"
            as="select"
            v-model="updateExpense.categoryId"
          >
            <option value="">請選擇類別</option>
            <option
              :value="category.id"
              v-for="category in store.categoryIcon"
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
              placeholder="名稱"
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
              value=""
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
          <button type="button" class="btn btn-primary w-100" @click="updateExpenseInfo">儲存</button>
        </div>
      </Form>
    </div>

    <!-- 支出 modal -->
    <div class="tab-pane fade" id="tabIncome" role="tabpanel" aria-labelledby="profile-tab">Income</div>
  </div>
</template>
