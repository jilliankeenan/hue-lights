import axios from 'axios'

const bridge = '10.64.12.88';
const apiKey = 'iDUbUlKUtrqhMvEWxf-5QZTrXgePaaqNLijIkEb1';

export const get = (endpoint) => {
  return axios.get('http://' + bridge + '/api/' + apiKey + endpoint);
}

export const post = (endpoint, body) => {
  return axios.post('http://' + bridge + '/api/' + apiKey + endpoint, body)
}

export const put = (endpoint, body) => {
    console.log("put")
    console.log('http://' + bridge + '/api/' + apiKey + endpoint)
    console.log(body)
  return axios.put('http://' + bridge + '/api/' + apiKey + endpoint, body)
}