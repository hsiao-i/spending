<script setup lang="ts">
import { ref } from 'vue';
import ModalShare from '@/components/ModalShare.vue';
import MultipleSpending from '@/components/MultipleSpending.vue';
import SingleSpending from '@/components/SingleSpending.vue';

const modalShare = ref();

const openModalStatus = ref('single');
const openModal = (status: string) => {
  openModalStatus.value = status;
  modalShare.value.openModalInComponent();
};

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">左邊日曆</div>
      <div class="col-md-6">
        <div class="bg-light shadow rounded-3 min-vh-80 p-4">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary" @click="openModal('single')">+ 記錄單筆</button>
            <button type="button" class="btn btn-outline-primary" @click="openModal('multiple')">+ 記錄多筆 </button>
          </div>
        </div>
        <ModalShare ref="modalShare">
          <template v-slot:record-spending>
            <SingleSpending v-if="openModalStatus === 'single'" />
            <MultipleSpending v-else-if="openModalStatus === 'multiple'" />
          </template>

        </ModalShare>
      </div>
    </div>

  </div>
</template>
