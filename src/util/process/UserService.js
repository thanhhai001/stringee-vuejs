import Api from './api'

export default {
  register(data) {
    return Api().post('/api/register', data, {})
  }
}
