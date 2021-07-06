
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('imagens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destaque:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'cursos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      aula_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'aulas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('imagens');

  }
};
