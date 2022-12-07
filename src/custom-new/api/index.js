import axios from 'axios'
import { fetch } from '../lib/fetch'

const isAborted = (err) => err.code === 'ERR_CANCELED'

const fetchPokemon = (signal) =>
  fetch({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts?_limit=10',
    signal
  })

const postPokemon = (data, signal) =>
  fetch({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data,
    signal
  })

export { fetchPokemon, postPokemon }
