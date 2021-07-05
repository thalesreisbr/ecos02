const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enderecos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cep: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    numero:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    nome_destinatario:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    telefone_destinatario:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    complemento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'enderecos',
    schema: 'public',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        name: "enderecos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
