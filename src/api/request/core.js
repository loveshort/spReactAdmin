import axios from 'axios'

// 第一层（底层）：负责创建 axios 实例，并挂载“全局拦截器 + 实例级拦截器”
// 说明：
// - 实例级拦截器：创建实例时传入，仅影响当前实例
// - 全局拦截器：所有实例共享，用于统一 token / loading 等策略

// 挂载实例级拦截器：由调用方在创建实例时传入，用于定制某一类接口的行为
export const applyInstanceInterceptors = (instance, interceptors) => {
  instance.interceptors.request.use(
    interceptors?.RequestInterceptors,
    interceptors?.requestInterceptorCache,
  )
  instance.interceptors.response.use(
    interceptors?.responseInterceptor,
    interceptors?.responseInterceptorCache,
  )
}

// 挂载全局拦截器：统一处理 token 注入与 loading 开关
// 约定：
// - requestConfig.withAuth === false 时，不自动注入 Authorization
export const applyGlobalInterceptors = (instance, { showLoading }) => {
  instance.interceptors.request.use(
    (requestConfig) => {
      // 在非浏览器环境（例如 SSR/测试环境）避免直接访问 localStorage
      const canReadLocalStorage = typeof localStorage !== 'undefined'
      const token = canReadLocalStorage ? localStorage.getItem('token') : null
      const shouldAttachAuth = requestConfig?.withAuth !== false

      if (token && shouldAttachAuth) {
        const nextHeaders = requestConfig.headers ?? {}
        if (!nextHeaders.Authorization) {
          nextHeaders.Authorization = `Bearer ${token}`
        }
        requestConfig.headers = nextHeaders
      }

      if (showLoading) {
        // 显示 loading
      }

      return requestConfig
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (res) => {
      if (showLoading) {
        // 隐藏 loading
      }
      return res
    },
    (error) => Promise.reject(error),
  )
}

// 创建 axios 实例，并按顺序挂载拦截器
// - config：axios.create 的配置 + 扩展字段 interceptors/showLoading
export const createAxiosInstance = (config) => {
  const { interceptors, showLoading, ...axiosConfig } = config || {}
  const instance = axios.create(axiosConfig)

  applyInstanceInterceptors(instance, interceptors)
  applyGlobalInterceptors(instance, { showLoading: showLoading ?? true })

  return instance
}

// 统一归一化 axios 错误：业务层只需要处理一种错误结构
// - 返回一个 Error(name='RequestError')，并附加 status/data/url/method 字段
export const normalizeAxiosError = (error) => {
  if (!axios.isAxiosError(error)) return error

  const message =
    error.response?.data?.message ||
    error.response?.data?.msg ||
    error.message ||
    '网络异常'

  const normalized = new Error(message)
  normalized.name = 'RequestError'
  normalized.status = error.response?.status
  normalized.data = error.response?.data
  normalized.url = error.config?.url
  normalized.method = error.config?.method
  return normalized
}
