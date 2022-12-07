import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import useIsMounted from '../../hooks/useIsMounted'
import useAbortSignalInterceptor from './useAbortSignalInterceptor'

const useFetch = (fetcher) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const isEffectCalled = useRef(false)

  const isMounted = useRef(false)
  useIsMounted()

  useEffect(() => {
    const abortController = new AbortController()
    isMounted.current = true

    const fetch = async () => {
      const res = await fetcher(abortController.signal)

      if (!res.success && res.error) {
        setError(res.error)
      }

      if (res.success) {
        setData(res.data)
      }
    }

    // if (isEffectCalled.current === false) {
    fetch()

    // isEffectCalled.current = true
    // }

    return () => {
      console.log('return: ', {
        isMounted: isMounted.current,
        isEffectCalled: isEffectCalled.current
      })

      abortController.abort()

      // if (isMounted.current === true) {
      //   isMounted.current = false
      //   abortController.abort()
      // }

      // isEffectCalled.current = true
    }
  }, [])

  return {
    data,
    error
  }
}

export default useFetch
