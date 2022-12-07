import { useCallback, useEffect, useRef, useState } from 'react'
import { fetch } from '../lib/fetch'

const useFetch = ({ query, init }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(null)
  console.log('🚀 ~ useFetch ~ data', data);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const isMounted = useRef(false)
  const abortController = useRef(null)

  const handleFetch = useCallback(async () => {
    abortController.current?.abort()

    abortController.current = new AbortController()

    setIsFetching(true)
    const res = await fetch({ ...query, signal: abortController.current.signal })

    setIsFetching(false)

    if (!res.success && res.error) {
      setIsError(true)
      setError(res.error)
    }

    if (res.success) {
      setIsError(false)
      setData(res.data)
    }
  }, [])

  useEffect(() => {
    isMounted.current = true

    if (init !== false) handleFetch()

    return () => {
      isMounted.current = false
      abortController.current?.abort()
    }
  }, [])

  return {
    fetch: handleFetch,
    isFetching,
    data,
    error,
    isError
  }
}

export default useFetch
