import axios from 'axios'

const isAborted = (err) => err.code === 'ERR_CANCELED'

const fetchPokemons = async ({ signal }) => {
  console.log('popal')
  const res = await axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
    signal
  })
  console.log('🚀 ~ fetchPokemons ~ res', res)

  return res.data
}

const postPokemon = async (
  data,
  { signal } = {
    signal: undefined
  }
) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data,
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

export { fetchPokemons, postPokemon }
