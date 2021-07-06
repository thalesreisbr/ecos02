'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('assinaturas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'cursos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'status', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stop_aula_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'aulas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      time_stop_aula_id: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      data_aquisicao:{
        type: Sequelize.DATE,
        allowNull:false
        
      },
      data_validade:{
        type: Sequelize.DATE,
        allowNull:false
        
      },
      created_at: {
        allowNull: true,
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

    return UsersTable;
  },

  down: queryInterface => queryInterface.dropTable('assinaturas'),
};
