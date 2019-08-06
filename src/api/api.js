import Vue from 'vue'
import axios from 'axios'
// import routes from '../routes/routes'
import qs from "qs"
axios.defaults.baseURL = "http://192.168.30.213:8002"
const baseConfig = {
  headers: {
    'content-Type': 'application/json;charset=UTF-8'
  }
}
axios.interceptors.request.use(
  config => {
    console.log(config)
    if (localStorage.getItem('token')) {
      config.headers.common['token'] = localStorage.getItem('token')
    }
    if (config.headers['Content-Type'] != 'multipart/form-data') {
      console.log(config.data)

    }
    return config
  }
)

function handlerReponse(response) {
  // 部分接口返回没code，导致code的undefined报错
  if (response.data.code === 401 && response.data.message == "not authrized") {
    // Vue.prototype.$notify({
    //   message: '登录信息过期，请重新登录',
    //   timeout: 3000,
    //   icon: 'now-ui-icons ui-1_bell-53',
    //   horizontalAlign: "right",
    //   verticalAlign: "top",
    //   type: "danger"
    // });
    localStorage.clear();
    location.href = "/"
  }
  console.log(response)
  let data = response.data
  return Promise.resolve(data)
}
const api = {
  axios: axios,
  $get: (url, data, config) => axios.get(url, {
    params: data
  }, config).then(handlerReponse),
  $post: (url, data, config) => axios.post(url, data, Object.assign({}, baseConfig, config))
    .then(handlerReponse),
  $delete: (url, config) =>
    axios
    .delete(url, config)
    .then(handlerReponse),
  $put: (url, data) =>
    axios
    .put(url, data)
    .then(handlerReponse)
}


export default api
