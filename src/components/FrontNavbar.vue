<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
// import { useIsLogin } from '@/stores/useIsLogin';

// const isLoginStore = useIsLogin();

const logout = () => {
  document.cookie = 'spendingToken=; ';
  // isLoginStore.isLogin = false;
  localStorage.removeItem('userId');
  sessionStorage.removeItem('isLogin');
  router.push('/');
};

const isLoginSessionStorage = sessionStorage.getItem('isLogin') === 'true';
console.log(isLoginSessionStorage);

// import { ref, onMounted } from 'vue';
// import { Dropdown } from 'bootstrap';

// let dropdownMethod: Dropdown;
// const dropDown = ref<HTMLElement | null>(null);
// const toggleDropdown = () => {
//   dropdownMethod.toggle();
// };
// onMounted(() => {
//   dropdownMethod = new Dropdown(dropDown.value!);
// });

// const token = document.cookie.replace(/(?:(?:^|.*;\s*)spendingToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
// 取出 cookie 名稱為 spendingToken 的值
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white">
    <div class="container">
      <h1>
        <a class="navbar-brand text-danger letter-1 fm-fre" href="#"
          >ExpenSaver</a
        >
      </h1>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link fw-bold" aria-current="page"
              >首頁</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/spending" class="nav-link fw-bold"
              >記帳</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/assets" class="nav-link fw-bold"
              >資產管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/charts" class="nav-link fw-bold"
              >圖表分析</RouterLink
            >
          </li>

          <template v-if="!isLoginSessionStorage">
            <li class="mx-md-3 mx-0">
              <RouterLink
                to="/login"
                class="btn btn-outline-danger rounded-pill nav-link fw-bold text-danger login-btn px-4"
                >登入</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/register"
                class="btn btn-danger rounded-pill nav-link fw-bold px-4 text-white"
                >註冊</RouterLink
              >
            </li>
          </template>
          <li v-else class="nav-item">
            <button
              type="button"
              class="btn text-logout fw-bold"
              @click="logout"
            >
              登出
            </button>
          </li>
          <!-- <li :class="{ 'd-none': isLogoutComputed, 'd-block': isLoginComputed }" class="nav-item">
            <button type="button" class="btn text-logout fw-bold" @click="logout">登出</button>
          </li> -->
          <!-- <li class="dropdown">
            <a class="dropdown-toggle" href="＃" data-bs-toggle="dropdown" @click="toggleDropdown">
              <div class="person-icon rounded-circle d-flex justify-content-center align-items-center">

                <img src="../assets/images/person-icon.svg" alt="人像icon">
              </div>
            </a>
            <ul class="dropdown-menu ">
              <li><a class="dropdown-item" href="#">登出</a></li>
            </ul>

          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.login-btn:hover {
  color: #ffffff !important;
}
.person-icon {
  width: 32px;
  height: 32px;
  background: #cbcbcb;
}
.text-logout {
  color: #c1c1c1;
}
</style>
