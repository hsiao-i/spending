# ExpenSaver 記帳

- [Demo](https://hsiao-i.github.io/spending/)

```
測試帳號：test4@mail.com
測試密碼：qwerasdzz
```

## 使用主要技術

- Vite 建置工具
- Json Server 模擬 API
- Vue3.js (Composition API)
- TypeScript
- Vue Router 路由管理
- Pinia 狀態管理
- Vee Validate 表單驗證
- Chart.js 圖表
- Bootstrap 5
- (ESLint Airbnb)

## 主要功能

- 模擬登入、註冊帳戶
- 每日收入、支出的新增、編輯、刪除
- 銀行帳戶的新增、刪除
- 個別銀行帳戶的收入支出總覽
- 當月收支的類別比例圓餅圖
- 當月支出金額前三名

### 啟用 json-server

1. 新開 bash，下指令 `npm run server`
2. db.json 為 json-server 模擬資料庫內容

### 初次啟用專案

```sh
npm install
```

### 編譯專案及開啟熱更新開發模式

```sh
npm run dev
```

### 正式環境打包專案

```sh
npm run build
```
