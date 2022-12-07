import { useEffect } from 'react'
import { fetchPokemon, postPokemon } from '../api'
import useFetch from '../hooks/useFetch'
import { fetchPokemonQuery, postPokemonQuery } from '../queries'

const POKEMON_DATA = {
  title: 'foo',
  body: 'bar',
  userId: 1
}

const Test = () => {
  const { data, error, isFetching, isError, fetch } = useFetch({
    query: fetchPokemonQuery(),
    init: false
  })

  const handleFetch = () => {
    fetch()
  }

  const renderContent = () => {
    if (isFetching) return <div>Loading</div>
    if (isError) return <div>{error || 'error'}</div>
    if (!data) return <div>no data</div>

    return data.map((i) => <div key={i.id}>{i.title}</div>)
  }

  return (
    <div>
      {renderContent()}
      <button onClick={handleFetch}>fetch</button>
    </div>
  )
}
export default Test
