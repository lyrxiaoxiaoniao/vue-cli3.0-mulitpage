import axios from 'axios'
import { Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 15000
// request拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.transformRequest = [
      function(data, headers) {
        let q = new URLSearchParams()
        for (let i in data) {
          q.append(i, data[i])
        }
        return q.toString()
      }
    ]
    return config
  },
  error => {
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(
  res => {
    // 响应成功关闭loading
    return res
  },
  error => {
    Message.error({
      message: '加载失败'
    })
    return Promise.reject(error)
  }
)

export default axios
