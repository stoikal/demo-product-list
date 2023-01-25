import Axios from 'axios'

const client = Axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default client
