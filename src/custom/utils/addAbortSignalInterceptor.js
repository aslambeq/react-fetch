import axios from 'axios'

const addAbortSignalInterceptor = () => {
  const abortController = new AbortController()

  axios.interceptors.request.use(
    function (config) {
      console.log('🚀 ~ config', config)
      // Do something before request is sent
      return {
        ...config,
        signal: abortController.signal
      }
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  return {
    abort: abortController.abort
  }
}

export default addAbortSignalInterceptor
