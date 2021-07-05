const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administradores', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ativo:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "administradores_email_key"
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token_recuperacao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    perfil_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'perfis',
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
    tableName: 'administradores',
    schema: 'public',
    //paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        name: "administradores_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "administradores_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
