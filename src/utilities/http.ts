import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_PATH}`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

instance.interceptors.request.use((config: any) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)spendingToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;

// export default function(method: string, url: string, data = null, config: any) {
//   method = method.toLowerCase()
//   switch (method) {
//     case 'post':
//       return instance.post(url, data, config)
//     case 'get':
//       return instance.get(url, { params: data })
//     case 'delete':
//       return instance.delete(url, { params: data })

//   default:
//     return false
//     }

// }
