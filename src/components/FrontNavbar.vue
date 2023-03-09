<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <h1><a class="navbar-brand text-danger letter-1 fm-fre" href="#">ExpenSaver</a></h1>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">

        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active fw-bold" aria-current="page">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/spending" class="nav-link fw-bold">記帳</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/assets" class="nav-link fw-bold">資產管理</RouterLink>
          </li>
          <li class="mx-3"><button type="button" class="btn btn-outline-danger rounded-pill  px-4">登入</button></li>
          <li>
            <button type="button" class="btn btn-danger rounded-pill px-4 text-white">註冊</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
