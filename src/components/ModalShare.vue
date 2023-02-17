<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  // import bootstrap from "bootstrap"
  import { Modal } from 'bootstrap';
  import axios from 'axios';
  import type { CategoryIcon } from '@/utilities/types';

  import CategoryIconView  from '@/components/CategoryIconView.vue';

  // import { useBsCollapseStore } from '@/stores/bsCollapse';
  // // const { collapseToggle, hello } = useBsCollapseStore()
  // const store = useBsCollapseStore()

  // 由父層開啟 modal
  const content = ref('0')
  let saveModal: Modal
  const modalShare = ref<HTMLElement | null >(null)

  const openModalInComponent = () => {
    console.log('觸發');
    console.log(categoryIcon);
    saveModal.show()
  }
  defineExpose({
    openModalInComponent
  })
  onMounted(() => {
    saveModal = new Modal(modalShare.value!)

  })

  //取出 category 顯示
  let categoryIcon = ref<CategoryIcon[]>([])
  const url = `${import.meta.env.VITE_PATH}/expenseCategories`
  const getExpenseCategories = async () => {
    try {
      const res = await axios.get(url)
      console.log(res);
      categoryIcon.value = res.data
      console.log(categoryIcon);

    } catch(e) {
      console.log(e);
    }
  }
  onMounted(() => {
    getExpenseCategories()
  })


</script>

<template>
  
  <div class="modal" tabindex="-1" ref="modalShare">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        
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

        <div class="tab-content px-4" id="expenseTabContent">
          <div class="tab-pane fade show active" id="tabExpense" role="tabpanel" aria-labelledby="home-tab">
            <div class="row row-cols-5">
              <CategoryIconView 
                  class="col mb-2" 
                  v-for="category in categoryIcon" 
                  :key="category.id"
                  :category="category"
                />
            </div>
            <form>
              
              <div class=" mb-3">
                <input type="date" class="form-control" id="recordInputDate" aria-describedby="dateHelp" value="2023-02-17">
                
              </div>
              <div class="mb-3 row">
                <div class=" col-8">
                  <input type="text" class="form-control" id="recordInputName" aria-describedby="nameHelp" placeholder="名稱" >
                </div>
                <div class=" col-4">
                  <input type="number" class="form-control" id="recordInputPrice" aria-describedby="priceHelp" placeholder="金額" value="0">
                </div>               
              </div>
              <div class="mb-3">
                <textarea class="form-control" placeholder="備註" id="recordTextarea" style="height: 100px"></textarea>
              </div>
              <!-- <div class="mb-3">
               
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div> -->
              <div class="py-4">
                <!-- <button type="button" class="btn btn-outline-secondary w-20 me-3" data-bs-dismiss="modal">取消</button> -->
                <button type="button" class="btn btn-primary w-100">儲存</button>
              </div>
              <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
            
            
            </form>

            
              
            
          </div>
          


          <div class="tab-pane fade" id="tabIncome" role="tabpanel" aria-labelledby="profile-tab">Income</div>         
        </div>
        

        <!-- <div class="collapse" id="collapseExpense" >
          <div class="modal-body">
            <p>支出內容</p>
          </div>
        </div>
        <div class="collapse" id="collapseIncome">
          <div class="modal-body">
            <p>收入內容</p>
          </div>
        </div> -->
        
        <!-- <div class="p-4">
          <button type="button" class="btn btn-outline-secondary w-20 me-3" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary w-75">儲存</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<!-- <style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");
@import url("https://fonts.googleapis.com/css?family=Quicksand&display=swap");

</style> -->
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