const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exposicao_produtos_fisicos', {
    produto_fisico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'produtos_fisicos',
        key: 'id'
      }
    },
    exposicao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exposicao',
        key: 'id'
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'exposicao_produtos_fisicos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "exposicao_produtos_fisicos_pkey",
        unique: true,
        fields: [
          { name: "produto_fisico_id" },
          { name: "exposicao_id" },
        ]
      },
    ]
  });
};
