const fetchPokemonQuery = () => ({
  method: 'get',
  url: 'https://jsonplaceholder.typicode.com/posts?_limit=10'
})

const postPokemonQuery = (data) => ({
  method: 'post',
  url: 'https://jsonplaceholder.typicode.com/posts',
  data
})

export { fetchPokemonQuery, postPokemonQuery }
