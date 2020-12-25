'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  // User.associate = function(models) {
  //   User.hasOne(models.userRoles, {
  //       foreignKey: 'id',
  //       targetKey: 'userId',
  //   });
  // };
  return User;
};
