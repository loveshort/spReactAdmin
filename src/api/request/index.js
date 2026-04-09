// axios 二次封装：支持实例级拦截器 + 单次请求拦截器（可按需开关 loading）
// 用法示例：
// - api.get({ url: '/users', params: { page: 1 } })
// - api.post({ url: '/login', data: { username, password }, withAuth: false })
//
// 约定：
// - config.withAuth === false 时，不自动注入 Authorization
// - 失败时统一抛出 name === 'RequestError' 的 Error，并附加 status/data/url/method 字段
import { createAxiosInstance, normalizeAxiosError } from './core'

class Request {
  constructor(config) {
    // 第一层：创建 axios 实例并挂载公共拦截器（全局 + 实例级）
    this.instance = createAxiosInstance(config)
  }

  request(config) {
    // 第二层：对单次请求做定制（单次拦截器 + 统一返回 data + 错误归一化）
    // 单次请求拦截器：只影响本次请求，不影响该实例的其它请求
    const baseConfig = { ...config }
    const finalConfig = config?.interceptors?.RequestInterceptors
      ? config.interceptors.RequestInterceptors(baseConfig)
      : baseConfig
    const { interceptors: _ignored, ...axiosConfig } = finalConfig

    return this.instance
      .request(axiosConfig)
      .then((res) => {
        // 单次响应拦截器：只影响本次请求的响应
        const processed = config?.interceptors?.responseInterceptor
          ? config.interceptors.responseInterceptor(res)
          : res
        // 统一返回 data，业务层直接拿到响应体
        return processed?.data ?? processed
      })
      .catch((error) => {
        // 统一错误结构：避免业务层到处判断 axiosError/response/status
        throw normalizeAxiosError(error)
      })
  }

  // 便捷方法：默认只需传 url/params/data 等字段
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }

}

export default Request
