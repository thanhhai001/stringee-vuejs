'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('roles', {
    key: DataTypes.INTEGER,
    value: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});


  return Role;
};
