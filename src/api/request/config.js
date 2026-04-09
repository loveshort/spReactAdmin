// 基础环境配置：统一在这里维护请求层的公共参数
// - baseURL 来自 .env.* 的 VITE_API_URL
// - timeout 为 axios 超时时间（毫秒）
export const baseURL = import.meta.env.VITE_API_URL ?? ''

export const timeout = 5000
