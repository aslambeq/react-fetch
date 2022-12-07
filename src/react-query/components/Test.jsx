import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchPokemons } from '../api'

const POKEMON_DATA = {
  title: 'foo',
  body: 'bar',
  userId: 1
}

const Test = () => {
  const [rerenderState, setRerenderState] = useState(false)

  const query = useQuery('pokemons', fetchPokemons, { cacheTime: 0 })
  console.log('🚀 ~ Test ~ query', query)

  return (
    <div>
      TEST
      <button onClick={() => setRerenderState((prev) => !prev)}>
        rerender test
      </button>
    </div>
  )
}
export default Test
