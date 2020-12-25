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
module.exports = {
}

