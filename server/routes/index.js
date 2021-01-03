var express = require('express');
var router = express.Router();

const UserController = require('../controllers').UserController;
const CourseController = require('../controllers').CourseController;
const UserCourseController = require('../controllers').UserCourseController;
// const StreamController = require('../controllers').StreamController;
const TopicController = require('../controllers').TopicController;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({page:'index'});
});


/* User Router */
router.post('/api/register', UserController.register);
router.post('/api/login', UserController.login);
router.post('/api/updateUser', UserController.update);
router.post('/api/userid', UserController.getUserById);
router.post('/api/approveUser', UserController.approveUserById);
router.get('/api/users', UserController.getUser);
router.get('/api/teachers', UserController.getTeacher);

/*Course Router*/
router.post('/api/create-course', CourseController.addCourse);
router.post('/api/courses', CourseController.getCourse);
router.post('/api/courses-update', CourseController.update);
router.post('/api/course-detail', CourseController.getCourseById);
router.post('/api/courses-by-user', CourseController.getCourseByUserId);

/*UserCourse Router*/
router.post('/api/statistical', UserCourseController.statisticalCourse);

/*Topic*/
router.get('/api/topic', TopicController.getAllTopic);

/*call video */
// router.get('/api/stream', StreamController.createRoom);

module.exports = router;
