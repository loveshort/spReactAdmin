// API 统一出口：对外暴露一个默认的请求实例（也可按需创建多个实例）
import Request from './request'
import { baseURL, timeout } from './request/config'

// createApi：需要多实例时使用（例如不同 baseURL、不同拦截器、不同超时策略）
// - options 会覆盖默认的 baseURL/timeout
export const createApi = (options = {}) =>
  new Request({
    baseURL,
    timeout,
    ...options,
  })

// 默认实例：适合大多数业务接口直接使用
const api = createApi()

export default api
export { Request, baseURL, timeout }
