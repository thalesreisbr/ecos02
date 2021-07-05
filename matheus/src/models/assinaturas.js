const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assinaturas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    produto_digital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'produtos_digitais',
        key: 'id'
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    stop_aula_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'aulas',
        key: 'id'
      }
    },
    time_stop_aula_id: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    data_aquisicao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_validade: {
      type: DataTypes.DATE,
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
    tableName: 'assinaturas',
    schema: 'public',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        name: "assinaturas_pkey",
        unique: true,
        fields: [
          { name: "produto_digital_id" },
          { name: "usuario_id" },
        ]
      },
    ]
  });
};
