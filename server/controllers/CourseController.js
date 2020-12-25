const Course = require('../models').courses;
const UserCourse = require('../models').userCourses;
var Sequelize = require('sequelize');
const unique = require('array-unique');
var Op = Sequelize.Op;

var config = require('../config/config.json');
const {
  Parser
} = require('json2csv');


var env = process.env.NODE_ENV || 'development';
var config_db = require(__dirname + '/../config/database.json')[env];
var QUERY = require('../queries/queryraw');
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config_db.database, config_db.username, config_db.password, config_db);
}
// var Sequelize = require('sequelize');
// var env = process.env.NODE_ENV || 'development';
// var config_db = require(__dirname + '/../config/database.json')[env];
module.exports = {

  async getCourse(req, res) {
    var request = req.body;
    var conditions = {};

    if(request.keyword != ''){
      conditions = {
        where : {
          status: '',
          [Op.or] : {
            courseName : {
              [Op.like] : '%' + request.keyword + '%'
            },
            courseDescription : {
              [Op.like] : '%' + request.keyword + '%'
            },
          }
        }
      };
    }
    //pagination
    var getRecords = await Course.count(conditions).then(res =>{
      return res;
    });
    var countPage = Math.ceil(getRecords / config.pagination);
    var start = (request.page - 1) * config.pagination;

    //pagination
    conditions.offset = start;
    conditions.limit = config.pagination;
    return await Course.findAll(conditions).then(courses => {
      res.status(200).send({
        status: true,
        list: courses,
        totalPage: countPage,
        startPage: start,
        limit: config.pagination,
        recordNumber: getRecords
      });
    })
    .catch(function(error) {
      res.send({
          status: '500',
          message: error
      })
  });
  },
  async addCourse(req, res) {
    var request = req.body;
    var course = {
      courseName: request.courseName,
      courseTypeId: request.courseTypeId,
      topicId: request.topicId,
      courseDescription: request.courseDescription,
      costs: request.costs,
      image: request.image,
      startDate: request.startDate,
      endDate: request.endDate
    };
    return await Course.create(course).then(courses => {
      res.status(200).send({
        status: true,
      })
    });
  },
  async getCourseById(req, res) {
    console.log(req);
    // var courseId = req.params.id;
    // return await Course.findOne({where:{id: courseId}}).then(course => {
    //   res.status(200).send({
    //     status: true,
    //     course: course
    //   });
    // })
  },
  async update(req, res) {
    var request = req.body;
    return await Course.update(request,{where:{id: request.id}}).then(course => {
      res.status(200).send({
        status: true,
        course: course
      });
    })
  },
  async getCourseByUserId(req, res) {
    var request = req.body;
    var listCourseId = [];
    var courses = await UserCourse.findAll({
      where:{
        // userId: request.userId
        userId: 1
      },
      raw: true
    }).then(function(result) {
        return result;
    });
    if(courses) {
      courses.forEach(ele => {
        listCourseId.push(ele.courseId);
      });
      listCourseId = unique(listCourseId);
      return await Course.findAll({where:{id:listCourseId},raw:true}).then(function(result){
        res.status(200).send({
          status: true,
          courses: result
        })
      });
    } else {
      return res.status(200).send({
        status: false,
      })
    }
  }
}