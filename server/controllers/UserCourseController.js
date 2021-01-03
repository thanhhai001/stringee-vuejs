const UserCourse = require('../models').userCourses;
const Course = require('../models').courses;
var fpgrowth = require('node-fpgrowth');
const moment = require('moment-timezone');
const unique = require('array-unique');
var _ = require('lodash');
var Sequelize = require('sequelize');
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

  async getUser(req, res) {
    var users = await UserCourse.findAll();
    return res.send({
      users: users
    });
  },
  async statisticalCourse(req, res) {
    var request = req.body;
    var listCourseByUser = [];
    var listUserId = [];
    var listCourseId = [];
    var courses = [];
    var countRecord = '';
    var resultsStatistical = [];
    var conditions = {};
    var countPage = '';
    var start = '';
    var limit = '';
    var offset = '';
    // Query =========================================================================
    if (request.from != '' && request.to != '') {
      conditions = {
        where: {
          registDate: {
            [Op.between]: [request.from, request.to]
          }
        },
        include: [{
          model: Course,
          attributes: ['courseName'],
        }],
      }
    } else if (request.from != '' && request.to == '') {
      var myDate = new Date();
      myDate.setTime(myDate.getTime() + 1000 * 60 * 60 * 9);
      var today = myDate;
      conditions = {
        where: {
          registDate: {
            [Op.between]: [request.from, today]
          }
        },
        include: [{
          model: Course,
          attributes: ['courseName'],
        }],
      }
    }

    var info = await UserCourse.findAll(conditions);
    info.forEach(item => {
      listUserId.push(item.userId);
      listCourseId.push(item.courseId);
    })
    listUserId = unique(listUserId);
    listCourseId = unique(listCourseId);

    listUserId.forEach(userId => {
      var couseByUser = []
      info.forEach(item => {
        if (item.userId == userId) {
          couseByUser.push(item.courseId);
        }
      });
      if (couseByUser.length > 0) {
        listCourseByUser.push(_.sortBy(couseByUser));
      }
    });

    if (listCourseId.length > 0) {
      courses = await Course.findAll({
        where: {
          id: listCourseId
        },
        raw: true
      })
    }
    // Calculate Data =========================================================================
    var fpGrowth = new fpgrowth.FPGrowth(.6);
    fpGrowth.on('data', function (Itemset) {
      var items = _.sortBy(Itemset.items);
      var support = Itemset.support;
      var courseName = [];
      items.forEach(item => {
        courses.forEach(ele => {
          if (ele.id == item) {
            courseName.push(ele.courseName);
          }
        })
      });
      resultsStatistical.push({
        courses: items.join(),
        courseName: courseName.join(),
        count: support
      });
    });
    // count result
    fpGrowth.exec(listCourseByUser)
      .then(function (itemsets) {
        countRecord = itemsets.length;
      });
    //pagination ===========================================================================
    countRecord = resultsStatistical.length;
    page = request.page;
    start = (request.page - 1) * config.pagination;
    countPage = Math.ceil(countRecord / config.pagination);
    offset = start;
    limit = config.paginationStatistical;
    resultsStatistical = _.orderBy(resultsStatistical, 'count', 'desc');
    resultsStatistical = resultsStatistical.slice((page - 1) * limit, page * limit)
    // Return Data =========================================================================
    return res.status(200).send({
      status: true,
      results: resultsStatistical,
      count: countRecord,
      offset: offset,
      limit: limit,
      start: start,
      countPage: countPage
    });
  },
  async getUserCourseByUser(req, res) {
    var request = req.params;
    return await UserCourse.findAll({where:{userId:request.userId},raw: true}).then(function(result) {
       res.status(200).send({
        status: true,
        userCourses : result
      });
    })
  },
  async isRegist(req, res) {
    var request = req.body;
    var userCourse = await UserCourse.findOne({where:{userId:request.userId, courseId:request.courseId},raw:true});
    if(userCourse) {
      return res.status(200).send({
        status: true,
      })
    } else {
      return res.status(200).send({
        status: false,
      })
    }
  },
  async registCourse(req, res) {
    var request = req.body;
    var myDate = new Date();
      myDate.setTime(myDate.getTime() + 1000 * 60 * 60 * 9);
    var today = myDate;
    var userCourse = {courseId: request.courseId, userId: request.userId, registDate: today};
    return await UserCourse.create(userCourse).then(userCourses => {
      res.status(200).send({
        status: true,
        message: 'Regist Success'
      })
    });
  }
}
