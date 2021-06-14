'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('perfis', [
      {
        id:1,
        active:true,
        perfil:"GERENTE"
      },
      {
        id:2,
        active:true,
        perfil:"OPERADOR"
        },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('perfis', null, {});
  }
};
