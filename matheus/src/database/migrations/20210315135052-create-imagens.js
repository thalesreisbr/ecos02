
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
      produto_fisico_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'produtos_fisicos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      produto_digital_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'produtos_digitais', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      exposicao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'exposicao', key: 'id' },
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
    return queryInterface.dropTable('imagens');

  }
};
