import Api from './api'

export default {
  getAll(data) {
    return Api().get('/api/topic', {});
  },
}