const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exposicao_produtos_digitais', {
    produto_digital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'produtos_digitais',
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'exposicao_produtos_digitais',
    schema: 'public',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        name: "exposicao_produtos_digitais_pkey",
        unique: true,
        fields: [
          { name: "produto_digital_id" },
          { name: "exposicao_id" },
        ]
      },
    ]
  });
};
