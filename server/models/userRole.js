'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('userRoles', {
    roleId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  UserRole.associate = function(models) {
    UserRole.belongsTo(models.users, {
        foreignKey: 'userId',
        targetKey: 'id',
    });
  };
  return UserRole;
};
