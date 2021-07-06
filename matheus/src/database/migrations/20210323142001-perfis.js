'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('perfis', [
      {
        id:1,
        ativo:true,
        perfil:"GERENTE"
      },
      {
        id:2,
        ativo:true,
        perfil:"OPERADOR"
        },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('perfis', null, {});
  }
};
