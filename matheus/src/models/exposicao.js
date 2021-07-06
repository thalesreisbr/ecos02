const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exposicao', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    descricao:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    preco_avista: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    preco_parcelado: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    desconto_percentual: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_parcelas: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'exposicao',
    schema: 'public',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        name: "exposicao_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
