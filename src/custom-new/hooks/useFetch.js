import { useCallback, useEffect, useRef, useState } from 'react';

import { fetch } from 'lib/fetch';

/**
 * @typedef {Object} useFetchProps
 * @property  {{
 *  method: 'get' | 'post' | 'put' | 'delete',
 *  url: string,
 *  data?: object,
 *  headers?: object,
 *  auth?: { username: string, password: string
 * }}} query
 * @property  {boolean} init
 * @property  {(data) => {}} onResponse обработка ответа
 * @property  {(data) => {}} onSuccess обработка данных после успешного onResponse
 * - вызывается только если передан onReponse
 * @property  {(err) => {}} onError обработка ошибки
 */

// isFetching,
// data,
// response,
// error,
// isError,
/**
 * @typedef {Object} useFetchReturn
 * @property {Function} fetch
 * @property {boolean} isFetching
 * @property {any} response ответ после fetch
 * @property {any} data ответ после onSuccess
 * - вызывается только если передан onSuccess
 * @property {string} error
 * @property {boolean} isError
 */

/**
  @param {useFetchProps}
  @returns {useFetchReturn}
 */
const useFetch = ({ query, init, onResponse, onSuccess, onError }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(false);
  const abortController = useRef(null);

  const handleFetch = useCallback(async () => {
    abortController.current?.abort();

    abortController.current = new AbortController();

    setIsFetching(true);
    const res = await fetch({
      ...query,
      signal: abortController.current.signal,
    });

    if (!res.success) {
      const err = res.error || 'Ошибка выполнения операции';

      setIsError(true);
      setError(err);
      if (onError) onError(err);
    }

    if (res.success) {
      setIsError(false);
      setResponse(res.data);
    }

    if (onResponse) {
      const result = onResponse(res.data);

      if (result.success === false) {
        const err = result.error || 'Ошика выполнения запроса';
        setIsError(true);
        setError(err);
        if (onError) onError(err);
      } else {
        setIsError(false);
        setData(result);
        if (onSuccess) onSuccess(result);
      }
    }

    setIsFetching(false);
  }, []);

  useEffect(() => {
    isMounted.current = true;

    if (init !== false) handleFetch();

    return () => {
      isMounted.current = false;
      abortController.current?.abort();
    };
  }, []);

  return {
    fetch: handleFetch,
    isFetching,
    data,
    response,
    error,
    isError,
  };
};

export default useFetch;
