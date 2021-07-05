const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagens', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    produto_fisico_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produtos_fisicos',
        key: 'id'
      }
    },
    produto_digital_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produtos_digitais',
        key: 'id'
      }
    },
    exposicao_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'exposicao',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'imagens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "imagens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
