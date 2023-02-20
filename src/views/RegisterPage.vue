<script setup lang="ts">
import type { UserRegister } from '@/utilities/types';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

  const router = useRouter()
  const user = ref<UserRegister>({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const submitRegister = async () => {
    try {
      const url = `${import.meta.env.VITE_PATH}/signup`
      const res = await axios.post(url,  user )
      console.log(res);
      alert('成功註冊，請重新登入')
      router.push('/login')


    } catch (err) {
        if (err instanceof Error) alert('此email 帳號已被註冊')
       

    }

  }

  const isPhone = (inputNumber: string) => {
    if (!inputNumber) {
      return '手機號碼 為必填'
    }
    const phoneNumber = /^(09)[0-9]{8}$/
    return phoneNumber.test(inputNumber) ? true : '需要正確的手機號碼'
  }
  
  

  
</script>

<template>
  <div class="container">
    <div class="w-50 shadow bg-light mx-auto p-4 rounded-5">
      <h2 clsaa="text-center">註冊</h2>
      <Form v-slot="{ errors }" @submit="submitRegister">
        <div class="mb-3">
          <label for="姓名" class="form-label">姓名</label>
          <Field type="text" class="form-control" id="姓名" name="姓名"
          placeholder="請輸入姓名"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          v-model="user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
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
        <div class="mb-5">
          <label for="手機號碼" class="form-label">手機號碼</label>
          <Field type="text" class="form-control" id="手機號碼" name="手機號碼"
          placeholder="請輸入手機號碼"
          :class="{ 'is-invalid': errors['手機號碼'] }"
          :rules="isPhone"
          v-model="user.phone"
          ></Field>
          <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
        </div>
        
        <button type="submit" class="btn btn-primary w-100" 
          :disabled="Object.keys(errors).length > 0" 
          >送出</button>
        
      </Form>
    </div>
  </div>
</template>

