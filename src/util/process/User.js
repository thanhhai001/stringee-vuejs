import Api from './api'

export default {
  register(data) {
    return Api().post('/api/register',data,[]);
  },
  login(data) {
    return Api().post('/api/login',data,[]);
  },
  getUser() {
    return Api().get('/api/users');
  },
  getTeacher() {
    return Api().get('/api/teachers');
  },
  getUserById(userId) {
    return Api().post('/api/userid', userId, {});
  },
  updateUser(data) {
    return Api().post('/api/updateUser',data,{});
  },
  approveUser(data) {
    return Api().post('/api/approveUser',data,{});
  },
}
