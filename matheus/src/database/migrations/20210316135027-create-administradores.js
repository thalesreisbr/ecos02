'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('administradores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ativo:{
        type: Sequelize.BOOLEAN,
        allowNull:true,
        default:true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refresh_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      token_recuperacao: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'perfis', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('administradores');

  }
};
