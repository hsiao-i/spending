import axios from "axios";

axios.interceptors.request.use((config: any) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)spendingToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (token) {
    config.headers.Authorization = token
    console.log(token);
  }
  return config
},(error) => {
  return Promise.reject(error)
})

export default axios