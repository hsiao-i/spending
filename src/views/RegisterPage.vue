<script setup lang="ts">
import type { UserRegister } from '@/utilities/types';
import axios from '@/utilities/http';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';

const router = useRouter();
const user = ref<UserRegister>({
  uuid: uuidv4(),
  name: '',
  email: '',
  password: '',
  phone: '',
});
const submitRegister = async () => {
  try {
    console.log(user.value);
    document.cookie = '';
    // user.value.uuid = uuidv4()
    console.log(user.value.uuid);
    const url = '/signup';
    const res = await axios.post(url, user.value);

    console.log(res);
    Swal.fire({
      icon: 'success',
      title: '成功註冊，請重新登入',
      confirmButtonColor: '#7fbcd2',
    });
    router.push('/login');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      Swal.fire({ icon: 'error', title: '註冊失敗', confirmButtonColor: '#cb7d56' });
    }
  }
};

const isPhone = (inputNumber: string) => {
  if (!inputNumber) {
    return '手機號碼 為必填';
  }
  const phoneNumber = /^(09)[0-9]{8}$/;
  return phoneNumber.test(inputNumber) ? true : '需要正確的手機號碼';
};

</script>

<template>
  <div class="container">
    <div class="w-50 shadow bg-light mx-auto p-4 rounded-5">
      <h2 clsaa="text-center">註冊</h2>
      <VForm v-slot="{ errors }" @submit="submitRegister">
        <div class="mb-3">
          <label for="姓名" class="form-label">姓名</label>
          <VField
            type="text"
            class="form-control"
            id="姓名"
            name="姓名"
            placeholder="請輸入姓名"
            :class="{ 'is-invalid': errors['姓名'] }"
            rules="required"
            v-model="user.name"
          />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="Email" class="form-label">Email</label>
          <VField
            type="mail"
            class="form-control"
            id="Email"
            name="Email"
            placeholder="請輸入 Email"
            :class="{ 'is-invalid': errors['Email'] }"
            rules="email|required"
            v-model="user.email"
          />
          <ErrorMessage name="Email" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="密碼" class="form-label">密碼</label>
          <VField
            type="password"
            class="form-control"
            id="密碼"
            name="密碼"
            placeholder="請輸入密碼"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required|min:8"
            v-model="user.password"
          />
          <ErrorMessage name="密碼" class="invalid-feedback" />
        </div>
        <div class="mb-5">
          <label for="手機號碼" class="form-label">手機號碼</label>
          <VField
            type="tel"
            class="form-control"
            id="手機號碼"
            name="手機號碼"
            placeholder="請輸入手機號碼"
            :class="{ 'is-invalid': errors['手機號碼'] }"
            :rules="isPhone"
            v-model="user.phone"
          />
          <ErrorMessage name="手機號碼" class="invalid-feedback" />
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="Object.keys(errors).length > 0"
        >送出</button>

      </VForm>
    </div>
  </div>
</template>
