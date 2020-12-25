const User = require('../models').users;
const UserRole = require('../models').UserRoles;
var Sequelize = require('sequelize');

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
  async register(req, res) {
    var request = req.body;
    var errors = [];
    if(request.fullName == '') {
      errors.push('Full name has not been entered');
    }
    if (request.username == '') {
      errors.push('User name has not been entered');
    } else {
      var users = await User.findOne({
        where:{
          'userName':request.userName
        },
        raw:true
      });
      console.log(users);
      if (users) {
        errors.push('User name has exists');
      }
    }
    if (request.password == '') {
      errors.push('Password has not been entered');
    }
    if (request.repassword == '') {
      errors.push('Repassword has not been entered');
    }
    if (request.password != request.repassword) {
      errors.push('Password not same Re-password');
    }
    if(errors.length > 0) {
      return res.status(200).send({
        status: false,
        message: errors
      });
    } else {
      var newuser = await User.create(request).then(user => {
        res.status(200).send({
          status: true,
          message: 'register success'
        });
      });
    }
  },

  async login(req, res) {
    var request = req.body;
    var users = await User.findOne({
      where:{
        'userName':request.userName,
        'password':request.password
      },
      raw:true
    }).then(users => {
      if(users) {
        return res.status(200).send({
          status: true,
          users: users
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'userName or password invalid'
        });
      }
    });
  },

  async getUser(req, res) {
    var users = await User.findAll().then(users => {
      return res.status(200).send({
        status: true,
        users: users
      });
    });
  },
  async getTeacher(req, res) {
    var teacher = await User.findAll({
      // where:{
        
      // },
      include: [{
        model: UserRole,
        attributes: ['roleId'],
      }],
    }).then(teacher => {
      return res.status(200).send({
        status: true,
        users: users
      });
    });
  },
  async update(req, res) {
    var request = req.body;
    var user = await User.update(request, { where: { id: request.id } }).then(users => {
      return res.status(200).send({
        status: true,
      });
    });
  },
  async getUserById(req, res) {
    var userId = req.body.userId;
    var users = await User.findOne({
      where:{
        'id':userId,
      },
      raw:true
    }).then(users => {
      return res.status(200).send({
        status: true,
        user: users
      });
    });
  },
}