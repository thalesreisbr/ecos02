'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('exposicao',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      destaque: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco_avista: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      preco_parcelado: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      desconto_percentual: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_parcelas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
       return queryInterface.dropTable('exposicao');

  }
};
