import axios from 'axios'
import { useEffect, useRef } from 'react'

const useAbortSignalInterceptor = () => {
  const abortController = useRef(new AbortController()).current

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        return {
          ...config,
          signal: abortController.signal
        }
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }, [])

  return {
    abortController
  }
}

export default useAbortSignalInterceptor
