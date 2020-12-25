'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      courseTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      levelId: {
        type: Sequelize.INTEGER,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      courseDescription: {
        type: Sequelize.STRING,
      },
      costs: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      image: {
        type: Sequelize.STRING,
      },
      URL : {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};
