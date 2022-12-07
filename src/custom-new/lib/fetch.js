import axios from 'axios'

const isAborted = (err) => err.code === 'ERR_CANCELED'

/**
 *
 * @param {{
 * method: 'get' | 'post' | 'put' | 'delete',
 * url: string,
 * data?: object,
 * signal: AbortSignal
 * }} options
 *
 * @returns {Promise<{
 * success: boolean,
 * data?: any,
 * error?: string,
 * isAborted?: boolean,
 * }>} promise
 */
const fetch = async ({ method, url, data, signal }) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      signal
    })

    if (!res) {
      return {
        success: false,
        error: 'Нет ответа'
      }
    }

    if (!res.data) {
      return {
        success: false,
        error: 'Получен пустой ответ'
      }
    }

    return { success: true, data: res.data }
  } catch (err) {
    if (isAborted(err))
      return {
        success: false,
        isAborted: true
      }

    return {
      success: false,
      error: err.message || 'Неуспешная операция'
    }
  }
}

export { fetch }
