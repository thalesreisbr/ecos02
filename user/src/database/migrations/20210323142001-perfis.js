'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Perfis', [
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
    return queryInterface.bulkDelete('Perfis', null, {});
  }
};
