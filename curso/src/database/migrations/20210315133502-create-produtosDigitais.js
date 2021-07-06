'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('cursos',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duracao:{
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      validade:{
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      link_hotmart:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
       return queryInterface.dropTable('cursos');
  }
};
