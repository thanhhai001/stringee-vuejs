import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://localhost:3005', // local host
    baseURL: 'ec2-52-44-235-121.compute-1.amazonaws.com' //server...
  })
}