import { useEffect, useRef, useState } from 'react'
import useIsMounted from '../../hooks/useIsMounted'
import { fetchPokemon, postPokemon } from '../api'
import useFetch from '../hooks/useFetch'
import useFetchOnce from '../hooks/useFetchOnce'

const POKEMON_DATA = {
  title: 'foo',
  body: 'bar',
  userId: 1
}

const Test = () => {
  const [rerenderState, setRerenderState] = useState(false)

  const { data, error } = useFetch(fetchPokemon)
  // const { data, error } = useFetchOnce(fetchPokemon)
  // const { data, error } = useFetchOnce(() => postPokemon(POKEMON_DATA))
  // const { data, error } = useFetch(() => postPokemon(POKEMON_DATA))
  // console.log('🚀 ~ Test ~ data', data);

  return (
    <div>
      TEST
      <button onClick={() => setRerenderState((prev) => !prev)}>rerender test</button>
    </div>
  )
}
export default Test
