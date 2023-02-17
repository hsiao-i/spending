<script setup lang="ts">
import ModalShare from '@/components/ModalShare.vue';
import { ref } from 'vue-demi';

const modalShare = ref()

const openModal = () => {
  modalShare.value.openModalInComponent() 
}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">左邊日曆</div>
      <div class="col-md-6">
        <div class="bg-light shadow rounded-3 min-vh-80 p-4">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary" @click="openModal">+ 記錄單筆</button>
            <button type="button" class="btn btn-outline-primary">+ 記錄多筆</button>
          </div>
        </div>
        <ModalShare ref="modalShare"></ModalShare>
      </div>
    </div>
    
  </div>
</template>
