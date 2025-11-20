import axios from "axios"

class Request {
  constructor(config) {
    const { interceptors, showLoading, ...axiosConfig } = config || {}
    this.instance = axios.create(axiosConfig)
    this.interceptors = interceptors || {}
    this.showLoading = showLoading ?? true
    
    this.instance.interceptors.request.use(this.interceptors?.RequestInterceptors, this.interceptors?.requestInterceptorCache)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCache)
    
     //所有实例共有的拦截器
     this.instance.interceptors.request.use(
        (config) => {
            if (this.showLoading) {
                //显示loading
            }
            console.log("所有实例都有的请求拦截器，请求成功")
            return config
        },
        (error) => {
            console.log("所有实例都有的请求拦截器，请求失败")
            return Promise.reject(error)
        }
     )

     //所有实例共有的响应拦截器
     this.instance.interceptors.response.use(
        (res) => {
            if (this.showLoading) {
                //隐藏loading
            }
            console.log("所有实例都有的响应拦截器，响应成功")
            return res
        },
        (error) => {
            console.log("所有实例都有的响应拦截器，响应失败")
            return Promise.reject(error)
        }
     )
    }

    request(config) {
      const baseConfig = { ...config }
      const finalConfig = config?.interceptors?.RequestInterceptors
        ? config.interceptors.RequestInterceptors(baseConfig)
        : baseConfig
      const { interceptors: _ignored, ...axiosConfig } = finalConfig
      return this.instance.request(axiosConfig)
        .then((res) => {
          const processed = config?.interceptors?.responseInterceptor
            ? config.interceptors.responseInterceptor(res)
            : res
          return processed?.data ?? processed
        })
    }   

    get(config) {
      return this.request({ ...config, method: "GET" })
    }

    post(config) {
      return this.request({ ...config, method: "POST" })
    }

    put(config) {
      return this.request({ ...config, method: "PUT" })
    }

    delete(config) {
      return this.request({ ...config, method: "DELETE" })
    }

    patch(config) {
      return this.request({ ...config, method: "PATCH" })
    }

}