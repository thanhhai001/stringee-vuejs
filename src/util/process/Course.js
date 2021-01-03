import Api from './api'

export default {
  register(data) {
    return Api().post('/api/create-course', data, {});
  },
  listCourse(data) {
    return Api().post('/api/courses', data, {});
  },
  getCourseDetail(courseId) {
    return Api().post('/api/course-detail', courseId, {});
  },
  getSameCourseDetail(courseId) {
    return Api().post('/api/same-course-detail', courseId, {});
  },
  update(course) {
    return Api().post('/api/courses-update', course, {});
  },
  getCourseByUser(userId) {
    return Api().post('/api/courses-by-user', userId, {});
  },
  checkRegistCourse(info) {
    return Api().post('/api/check-regist-course', info, {});
  },
  registerCourse(info) {
    return Api().post('/api/regist-course', info, {});
  }
}
