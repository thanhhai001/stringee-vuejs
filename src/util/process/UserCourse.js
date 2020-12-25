import Api from './api'

export default {
  statisticalCourse(data) {
    return Api().post('/api/statistical', data, {})
  }
}
