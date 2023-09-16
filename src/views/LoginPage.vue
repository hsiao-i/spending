<script setup lang="ts">
import type { UserLogin } from '@/utilities/types';
import { ref } from 'vue';
import axios from '@/utilities/http';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
// import { useIsLogin } from '@/stores/useIsLogin';

const router = useRouter();
const user = ref<UserLogin>({
  email: '',
  password: '',
});
// const isLoginStore = useIsLogin();
const submitLogin = async () => {
  try {
    const url = '/login';
    const res = await axios.post(url, user.value);

    localStorage.setItem('userId', res.data.user.id);
    sessionStorage.setItem('isLogin', 'true');
    document.cookie = `spendingToken=${res.data.accessToken}`;
    Swal.fire({
      icon: 'success',
      title: '成功登入',
      confirmButtonColor: '#7fbcd2',
    });
    // isLoginStore.isLogin = true;
    router.push('/spending');
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: '請確認帳號或密碼是否正確',
    });
    console.log(err);
  }
};
</script>
<template>
  <div class="container">
    <div class="w-50 shadow bg-light mx-auto p-4 rounded-5 min-vh-80">
      <h2 class="text-center">登入</h2>
      <VForm v-slot="{ errors }" @submit="submitLogin">
        <!-- {{ errors }} {{ typeof(errors) }} -->

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

        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="Object.keys(errors).length > 0"
        >
          送出
        </button>
      </VForm>
    </div>
  </div>
</template>
