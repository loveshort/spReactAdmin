import axios from 'axios'

// axios 二次封装：支持实例级拦截器 + 单次请求拦截器（可按需开关 loading）
class Request {
  constructor(config) {
    const { interceptors, showLoading, ...axiosConfig } = config || {}
    this.instance = axios.create(axiosConfig)
    this.interceptors = interceptors || {}
    this.showLoading = showLoading ?? true

    this.instance.interceptors.request.use(
      this.interceptors?.RequestInterceptors,
      this.interceptors?.requestInterceptorCache,
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCache,
    )

    // 所有实例共有的拦截器：可用于统一处理 loading / token / 日志 等
    this.instance.interceptors.request.use(
      (requestConfig) => {
        if (this.showLoading) {
          // 显示 loading
        }
        if (import.meta.env.DEV) {
          console.log('request ok')
        }
        return requestConfig
      },
      (error) => {
        if (import.meta.env.DEV) {
          console.log('request error')
        }
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        if (this.showLoading) {
          // 隐藏 loading
        }
        if (import.meta.env.DEV) {
          console.log('response ok')
        }
        return res
      },
      (error) => {
        if (import.meta.env.DEV) {
          console.log('response error')
        }
        return Promise.reject(error)
      },
    )
  }

  request(config) {
    const baseConfig = { ...config }
    const finalConfig = config?.interceptors?.RequestInterceptors
      ? config.interceptors.RequestInterceptors(baseConfig)
      : baseConfig
    const { interceptors: _ignored, ...axiosConfig } = finalConfig

    return this.instance.request(axiosConfig).then((res) => {
      const processed = config?.interceptors?.responseInterceptor
        ? config.interceptors.responseInterceptor(res)
        : res
      return processed?.data ?? processed
    })
  }

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
