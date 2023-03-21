<template>
  <main>
    <div class="position-relative">
      <div class="container">
        <div class="row align-items-center mb-9 ">
          <div class="col-md-6">
            <h2 class="h1 text-danger fw-bold mb-3 fm-fre letter-1 text-break">ExpenSaver</h2>
            <p class="fs-2 fw-bold mb-4">懶人快速記帳 <br>
              一次記錄多筆常用開銷
            </p>
            <p class="fs-4 mb-4">不再怕麻煩，早餐、午餐、晚餐一次記錄！</p>
            <img src="@/assets/images/decoration-1.png" alt="decoration" class="b-image position-absolute d-sm-block d-none">

            <RouterLink to="/login">
              <button type="button" class="btn btn-danger rounded-pill text-white px-5">立即試用</button>
            </RouterLink>
          </div>
          <div class="col-md-6">
            <img src="@/assets/images/banner-1-main.png" alt="banner">
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container"> -->

    <div class="container mb-9">
      <h2 class="text-center">你知道自己適合哪種記帳方式嗎？</h2>
      <div class="row align-items-center justify-content-between">
        <div class="col-md-6">
          <img src="@/assets/images/banner-2-calculate.png" alt="calculate">
        </div>
        <div class="col-md-6">
          <p class="lh-lg">
            記帳程式百百種，但每個人記帳習慣不同， <br>
            有些人記錄詳細、有些人記錄整體， <br>
            找到適合自己的方式，才能持續的記錄， <br>
            藉以掌握自己的消費習慣，進而達到理財的效果。
          </p>
        </div>
      </div>
    </div>

    <div class="position-relative">
      <div class="container mb-9">
        <h2 class="mb-5 text-center">你在記帳方面是不是有這些煩惱呢？</h2>
        <img src="@/assets/images/decoration-2.png" alt="decotation" class="z-index position-absolute top-0 start-0 w-100 d-md-block d-none">
        <div class="row justify-content-between">

          <div class="col-md-3 mb-3">
            <div class="mb-2 text-center">
              <img src="@/assets/images/banner-3-1-complicate.png" alt="forget to record">
            </div>
            <p class="text-center h5 lh-lg">
              常常忘記記帳，<br>
              感到心有餘而力不足
            </p>
          </div>
          <div class="col-md-3 mb-3">
            <div class="mb-2 text-center">
              <img src="@/assets/images/banner-3-2-annoy.png" alt="annoy">
            </div>
            <p class="text-center h5 lh-lg">
              覺得記帳麻煩，<br>
              怎麼選項按鍵這麼多
            </p>
          </div>
          <div class="col-md-3 mb-3">
            <div class="mb-2 text-center">
              <img src="@/assets/images/banner-3-3-assets.png" alt="many assets">
            </div>
            <p class="text-center h5 lh-lg">
              有好幾個帳戶，<br>
              不知道怎麼管理
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative">
      <div class="container mb-8">
        <h2 class="text-center mb-3">懶人記帳，解決這些煩惱！</h2>
        <p class="text-center text-secondary mb-6">
          快速記帳功能讓記帳更為方便，同時可設定每月固定收支，減省重複性行為。且透過圖表報表了解消費習費，更掌握自己的財務運用情形。
        </p>
        <div class="row g-4">
          <div class="col-md-6">
            <img
              src="@/assets/images/decoration-5.png"
              alt="decoration"
              class="z-index position-absolute d-none d-sm-block"
              style="left:0.5rem; top:5rem">
            <div class="mb-0 text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-1-multipleRecord.png" alt="multiple record" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">一鍵記錄常用收支</h3>
                <p>早餐午餐晚餐一次記錄</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 position-relative">
            <img
              src="@/assets/images/decoration-8.png"
              alt="decoration"
              class="z-index-top position-absolute r-deco d-none d-sm-block"
              style="right: 0rem; bottom: 4rem"
              width="15%"
            >
            <div class="text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-2-autoRecord.png" alt="auto record" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">自動記錄每月固定收支</h3>
                <p>每月自動記錄薪水和固定消費</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 position-relative">
            <img
              src="@/assets/images/decoration-6.png"
              alt="decoration"
              class="z-index-top position-absolute d-none d-sm-block"
              style="bottom: 5rem; left: -2rem">
            <div class="text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-3-bankRecord.png" alt="bank record" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">分帳戶管理</h3>
                <p>多個帳戶個別記錄收支</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 position-relative">
            <img
              src="@/assets/images/decoration-4.png"
              alt="decoration"
              class="z-index position-absolute r-deco d-none d-sm-block"
              style="top: 4rem; right: 0rem; transform: rotate(10deg)"
              width="15%">
            <div class="text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-4-goal.png" alt="goal" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">設定財務目標</h3>
                <p>有目標讓記帳更有動力</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 position-relative">
            <img
              src="@/assets/images/decoration-3.png"
              alt="decoration"
              class="z-index position-absolute d-none d-sm-block"
              style="top: 7rem; left: -8rem;">
            <div class="text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-5-chart.png" alt="chart" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">圖表分析</h3>
                <p>藉以了解自己的消費習慣</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 position-relative">
            <img
              src="@/assets/images/decoration-7.png"
              alt="decoration"
              class="z-index-top position-absolute r-deco d-none d-sm-block"
              style="bottom: 5rem; right: 0rem;"
              width="15%"
            >
            <div class="text-center bg-white shadow rounded-4 py-5 px-2">
              <div class="mb-4">
                <img src="@/assets/images/banner-4-6-sort.png" alt="sort" width="95%">
              </div>
              <div class="text-center">
                <h3 class="h5 mb-md-3 mb-2">每月支出金額前三名</h3>
                <p>觀察自己是否有不必要的花費</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

</template>

<style>
.b-image {
  left: 0;
  top: 0rem;
  width: 55%;
  z-index: -10;
}
@media (max-width: 768px) {
  .b-image {
    top: -10rem;
    left: 0rem;
    width: 100%;
  }
}

.z-index {
  z-index: -10;
}
.z-index-top {
  z-index: 20;
}

/* .r-deco {
  right: 0rem !important;
  width: 15% !important;
} */

@media (max-width: 912px) {
  /* .r-deco  {
  width: 10%;
  right: 1rem !important;
  display: none;
  } */
}

</style>
