import { Store } from 'redux'
import { axiosApi } from 'utils/axios'

let requestInterceptorId = 0
let responseInterceptorId = 0

const registerRequestInterceptors = (store: Store) => {
  return axiosApi.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token')
    const accessHeader = accessToken ? 'JWT ' + accessToken : null
    if (accessHeader) {
      config.headers.Authorization = accessHeader
    }

    return config
  })
}

const registerResponseInterceptors = (store: Store) => {
  return axiosApi.interceptors.response.use(
    async response => {
      return response
    },
    async error => {
      const originalRequest = error.config

      // Prevent infinite loops
      if (
        error.response.status === 401 &&
        originalRequest.url.endsWith('token/refresh/')
      ) {
        window.location.href = '/login/'
        return Promise.reject(error)
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'
      ) {
        const refresh = localStorage.getItem('refresh_token')

        if (refresh) {
          const tokenParts = JSON.parse(atob(refresh.split('.')[1]))

          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000)

          if (tokenParts.exp > now) {
            try {
              const response = await axiosApi.post('/token/refresh/', {
                refresh,
              })
              setNewHeaders(response)
              originalRequest.headers['Authorization'] =
                'JWT ' + response.data.access
              return axiosApi(originalRequest)
            } catch (error) {
              console.log(error)
            }
          } else {
            console.log('Refresh token is expired', tokenParts.exp, now)
            // window.location.href = "/login/";
          }
        } else {
          console.log('Refresh token not available.')
          // window.location.href = "/login/";
        }
      }

      // specific error handling done elsewhere
      return Promise.reject(error)
    },
  )
}

export function setNewHeaders(response) {
  if (response.data.access) {
    axiosApi.defaults.headers['Authorization'] = 'JWT ' + response.data.access
    localStorage.setItem('access_token', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
  }
}

export const registerInterceptors = (store: Store) => {
  if (requestInterceptorId) {
    axiosApi.interceptors.request.eject(requestInterceptorId)
  }
  requestInterceptorId = registerRequestInterceptors(store)

  if (responseInterceptorId) {
    axiosApi.interceptors.response.eject(responseInterceptorId)
  }
  responseInterceptorId = registerResponseInterceptors(store)
}
