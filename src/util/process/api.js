import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3005', // local host
    // baseURL: 'postgres://vgangptumwahle:4ac9b48c65dcaef4ef0bf9414a3ab60610505304d00f08a2ed2b46fa3255f6d5@ec2-52-44-235-121.compute-1.amazonaws.com:5432' //server...
  })
}