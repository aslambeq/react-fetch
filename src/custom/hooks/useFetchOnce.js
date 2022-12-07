import axios from 'axios'
import { useRef, useState } from 'react'
import useEffectOnce from './useEffectOnce'

const useFetchOnce = (fetcher) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffectOnce(() => {
    const abortController = new AbortController()
    const fetch = async () => {
      // TODO test abort
      const res = await fetcher(abortController.signal)

      if (!res.success && res.error) {
        setError(res.error)
      }

      if (res.success) {
        setData(res.data)
      }
    }

    const intercept = () => {
      axios.interceptors.request.use(
        function (config) {
          return {
            ...config,
            signal: abortController.current.signal
          }
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    }

    // intercept()
    fetch()

    return () => {
      console.log('RETURN')
      abortController.abort()
    }
  }, [])

  return {
    data,
    error
  }
}

export default useFetchOnce
