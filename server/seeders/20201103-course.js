'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var currently_time = new Date();
    currently_time.setTime(currently_time.getTime() + 1000 * 60 * 60 * 9);
    var today = currently_time




    return queryInterface.bulkInsert('courses', [{
        courseName: 'Vẽ cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Vẽ nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập trình C cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập Trình C nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập trình Python cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập Trình Python nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập trình Java cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Lập Trình Java nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Adobe Photoshop cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Adobe Photoshop nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Adobe Illustrator cơ bản',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        courseName: 'Adobe Illustrator nâng cao',
        topicId:1,
        courseTypeId: 1,
        costs: 500000,
        startDate: '04/11/2020',
        endDate: '04/12/2020',
        status: '',
        createdAt: today,
        updatedAt: today,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
