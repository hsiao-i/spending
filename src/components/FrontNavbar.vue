<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
import {
  computed, ref, onMounted, watch,
} from 'vue';

const isLogin = ref(false);

const logout = () => {
  document.cookie = 'spendingToken=; ';

  localStorage.removeItem('userId');
  sessionStorage.setItem('isLogin', 'false');

  isLogin.value = false;
  router.push('/');
};

const isLoginSessionStorage = computed(() => sessionStorage.getItem('isLogin') === 'true');

watch(isLoginSessionStorage, (newVal: boolean) => {
  isLogin.value = newVal;
});

onMounted(() => {
  isLogin.value = isLoginSessionStorage.value;
});

</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white">
    <div class="container">
      <h1>
        <a
          class="navbar-brand text-danger letter-1 fm-fre"
          href="#"
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
            <RouterLink
              to="/"
              class="nav-link fw-bold"
              aria-current="page"
            >首頁</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/spending"
              class="nav-link fw-bold"
            >記帳</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/assets"
              class="nav-link fw-bold"
            >資產管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/charts"
              class="nav-link fw-bold"
            >圖表分析</RouterLink
            >
          </li>

          <template v-if="!isLogin">
            <li class="mx-0 mx-md-3 mb-2 mb-lg-0  ">
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

<style scoped lang="scss">
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
@media (min-width: 992px) {
  .mb-lg-0 {
    margin-bottom: 0rem !important;
  }
}
</style>
