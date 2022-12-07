import { useCallback, useEffect, useRef } from 'react'

/**
 *
 * @param {Function} onCleanup
 * @returns
 */
const useIsMounted = (onCleanup) => {
  const isMounted = useRef(false)
  const isEffectCalled = useRef(false)

  useEffect(() => {
    if (!isEffectCalled.current) {
      isMounted.current = true
      isEffectCalled.current = true
    }

    return () => {
      if (onCleanup) onCleanup()
      isMounted.current = false
    }
  }, [])

  return {
    isMounted: useCallback(() => isMounted.current, [])
  }
}

export default useIsMounted
