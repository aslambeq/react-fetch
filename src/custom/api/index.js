import axios from 'axios'

const isAborted = (err) => err.code === 'ERR_CANCELED'

const fetchPokemon = async (signal) => {
  console.log('🚀 ~ fetchPokemon ~ signal', signal);
  try {
    const res = await axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts?_limit=10',
      signal
    })

    console.log('🚀 ~ fetchPokemon ~ res', res)

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
    console.error(err)
    if (isAborted(err))
      return {
        success: false,
        isAborted: true
      }

    return {
      success: false,
      error: 'Неуспешная операция'
    }
  }
}

const postPokemon = async (
  data,
) => {
  console.log('🚀 ~ data', data);
  console.log('popal')
  try {
    const res = await axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data,
    })

    console.log('🚀 ~ fetchPokemon ~ res', res)

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
    console.error(err)
    if (isAborted(err))
      return {
        success: false,
        isAborted: true
      }

    return {
      success: false,
      error: 'Неуспешная операция'
    }
  }
}

export { fetchPokemon, postPokemon }
