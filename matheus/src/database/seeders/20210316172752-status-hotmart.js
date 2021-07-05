'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('status', [
      {
        status:'ACTIVE',
      },
      {
        status:'INACTIVE',
      },
      {
        status:'DELAYED',
      },
      {
        status:'CANCELLED_BY_CUSTOMER',
      },
      {
        status:'CANCELLED_BY_SELLER',
      },
      {
        status:'CANCELLED_BY_ADMIN', 
      },
      {
        status:'OVERDUE',
        
      },
      {
        status:'STARTED',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {});
  }

};
