import Api from './api'

export default {
  register(data) {
    return Api().post('/api/create-course', data, {});
  },
  listCourse(data) {
    return Api().post('/api/courses', data, {});
  }
  ,CourseDetail(courseId) {
    return Api().post('/api/course-detail', courseId);
  },
  update(course) {
    return Api().post('/api/courses-update', course, {});
  },
  getCourseByUser(userId) {
    return Api().post('/api/courses-by-user', userId, {});
  }
}
