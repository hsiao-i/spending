import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field, Form, ErrorMessage, defineRule, configure} from 'vee-validate';
// import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import AllRules from '@vee-validate/rules';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 引入多國語系

import 'material-icons/iconfont/material-icons.css';
import './assets/all.scss'
// import { v4 as uuidv4 } from 'uuid';

import App from './App.vue'
import router from './router'

// vee validate 相關設定
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
	generateMessage: localize({zh_TW: zhTW}),
	validateOnInput: true,
});
setLocale('zh_TW'); //因為語系檔沒辦法直接啟用，因此會強制預設語系為中文

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')
