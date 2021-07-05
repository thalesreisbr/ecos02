const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produtos_digitais', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    validade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    link_hotmart: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2021-07-05 18:39:25.251+00"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2021-07-05 18:39:25.251+00"
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2021-07-05 18:39:25.251+00"
    }
  }, {
    sequelize,
    tableName: 'produtos_digitais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "produtos_digitais_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
