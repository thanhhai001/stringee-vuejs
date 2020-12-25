'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var currently_time = new Date();
    currently_time.setTime(currently_time.getTime() + 1000 * 60 * 60 * 9);
    var today  = currently_time


    return queryInterface.bulkInsert('users', [
      {
        userName: 'user01',
        password: '123456',
        fullName: 'Vũ Văn Hóa',
        email: 'vvh@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user02',
        password: '123456',
        fullName: 'Hà Thanh Thanh',
        email: 'htt@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user03',
        password: '123456',
        fullName: 'Nguyễn Trung Trực',
        email: 'ntt@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user04',
        password: '123456',
        fullName: 'Đỗ Văn Huy',
        email: 'dvh@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user05',
        password: '123456',
        fullName: 'Trần Minh Tuấn',
        email: 'tmt@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user06',
        password: '123456',
        fullName: 'Cao Thị Huyền Trâm',
        email: 'ctht@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user07',
        password: '123456',
        fullName: 'Nguyễn Thị Hoa',
        email: 'nth@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user08',
        password: '123456',
        fullName: 'Trần Bình',
        email: 'tb@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user09',
        password: '123456',
        fullName: 'Huỳnh Hoàng',
        email: 'hh@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
      {
        userName: 'user10',
        password: '123456',
        fullName: 'Lã Đông',
        email: 'ld@gmail.com',
        status: '',
        createdAt: today,
        updatedAt: today,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
