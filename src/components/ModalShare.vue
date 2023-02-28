<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  // import bootstrap from "bootstrap"
  import { Modal } from 'bootstrap';
  // import axios from 'axios';
  // import type { CategoryIcon } from '@/utilities/types';

  // import CategoryIconView  from '@/components/CategoryIconView.vue';

  // 由父層開啟 modal
  const content = ref('0')
  let saveModal: Modal
  const modalShare = ref<HTMLElement | null >(null)

  const openModalInComponent = () => {
    console.log('觸發');
    saveModal.show()
  }
  defineExpose({
    openModalInComponent
  })
  onMounted(() => {
    saveModal = new Modal(modalShare.value!)

  })

 
  // onMounted(() => {
  //   getExpenseCategories()
  // })


</script>

<template>
  
  <div class="modal" tabindex="-1" ref="modalShare">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <slot name="record-assets">
          <div class="p-4">
            <div class=" text-end mb-3">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- <h5 class="modal-title">Modal title</h5> -->
            <div class="btn-group w-100" role="tablist" aria-label="Basic outlined example">
              <button type="button" class="btn btn-outline-primary fw-bold active" 
              data-bs-toggle="tab"
              data-bs-target="#tabExpense" 
              role="tab"
              >支出</button>
              <button type="button" class="btn btn-outline-primary fw-bold"
              data-bs-toggle="tab"
              data-bs-target="#tabIncome" 
              role="tab"
              >收入</button>
            </div>          
          </div>

        
          <main>
            <slot name="record-spending"></slot>
          </main>
        </slot>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .category-active {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      top: 4px;
      right: 6px;
      border: solid aqua;
      // background-color: aqua;
      border-radius: 50%;
    }
  }

</style>