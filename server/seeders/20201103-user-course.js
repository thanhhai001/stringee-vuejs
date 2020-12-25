'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var currently_time = new Date();
    currently_time.setTime(currently_time.getTime() + 1000 * 60 * 60 * 9);
    var today = currently_time




    return queryInterface.bulkInsert('userCourses', [{
        courseId: 1,
        userId: 1,
        registDate:'04/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 1,
        userId: 3,
        registDate:'05/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 1,
        userId: 5,
        registDate:'06/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 1,
        userId: 7,
        registDate:'06/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 2,
        userId: 2,
        registDate:'06/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 2,
        userId: 4,
        registDate:'08/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 2,
        userId: 6,
        registDate:'08/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseId: 2,
        userId: 8,
        registDate:'10/11/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userCourses', null, {});
  }
};
