// API 统一出口：对外暴露一个默认的请求实例（也可按需创建多个实例）
import Request from './request/request'
import { baseURL, timeout } from './request/config'

const api = new Request({
  baseURL,
  timeout,
})

export default api
export { Request, baseURL, timeout }
