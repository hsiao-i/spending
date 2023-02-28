<script setup lang="ts">
  import { useCategoryStore } from '@/stores/useCategoryStore';
  import { onMounted } from 'vue'
  import CategoryIconView from './CategoryIconView.vue';

  const store = useCategoryStore()

  onMounted(() => {
    store.getExpenseCategories()
  })

</script>

<template>
   <div name="single-record" class="tab-content px-4" id="expenseTabContent">
    <!-- 收入 modal -->
    <div class="tab-pane fade show active" id="tabExpense" role="tabpanel" aria-labelledby="home-tab">
      <div class="row row-cols-5">
        <CategoryIconView 
            class="col mb-2" 
            v-for="category in store.categoryIcon" 
            :key="category.id"
            :category="category"
          />
      </div>
      <form>             
        <div class=" mb-3">
          <label for="recordInputDate" class="form-label">日期</label>
          <input type="date" class="form-control" id="recordInputDate" aria-describedby="dateHelp" value="2023-02-17">
          
        </div>
        <div class="mb-3 row">
          <div class=" col-8">
            <label for="recordInputName" class="form-label">名稱</label>
            <input type="text" class="form-control" id="recordInputName" aria-describedby="nameHelp" placeholder="名稱" >
          </div>
          <div class=" col-4">
            <label for="recordInputPrice" class="form-label">金額</label>
            <input type="number" class="form-control" id="recordInputPrice" aria-describedby="priceHelp" placeholder="金額" value="0">
          </div>               
        </div>
        <div class="mb-3">
          <label for="recordTextarea" class="form-label">備註</label>
          <textarea class="form-control" placeholder="備註" id="recordTextarea" style="height: 100px"></textarea>
        </div>

        <div class="py-4">
          <!-- <button type="button" class="btn btn-outline-secondary w-20 me-3" data-bs-dismiss="modal">取消</button> -->
          <button type="button" class="btn btn-primary w-100">儲存</button>
        </div>     
      </form>     
    </div>

    <!-- 支出 modal -->
    <div class="tab-pane fade" id="tabIncome" role="tabpanel" aria-labelledby="profile-tab">Income</div>         
  </div>
</template>