<script setup lang="ts">
  import type { UserLogin } from '@/utilities/types';
  import { ref } from 'vue'
  import axios from '@/utilities/http'
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const user = ref<UserLogin>({
    email: '',
    password: ''
  })
  const submitLogin = async () => {
    try {
      const url = `/login`
      const res = await axios.post(url, user.value)

      document.cookie = `spendingToken=${res.data.accessToken}`
      alert('成功登入')
      router.push('/expense')

    } catch (err) {
      console.log(err);
    }
  }
</script>
<template>
  <div class="container">
    <div class="w-50 shadow bg-light mx-auto p-4 rounded-5">
      <h2 clsaa="text-center">登入</h2>
      <Form v-slot="{ errors, values, validate }" @submit="submitLogin">
        {{ errors }} {{ typeof(errors) }}

        <div class="mb-3">
          <label for="Email" class="form-label">Email</label>
          <Field type="email" class="form-control" id="Email" name="Email"
          placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors['Email'] }"
          rules="email|required"
          v-model="user.email"
          ></Field>
          <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="密碼" class="form-label">密碼</label>
          <Field type="password" class="form-control" id="密碼" name="密碼"
          placeholder="請輸入密碼"
          :class="{ 'is-invalid': errors['密碼'] }"
          rules="required|min:8"
          v-model="user.password"
          ></Field>
          <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
        </div>
       
        
        <button type="submit" class="btn btn-primary w-100" 
          :disabled="Object.keys(errors).length > 0" 
          >送出</button>
        
      </Form>
    </div>
  </div>
</template>