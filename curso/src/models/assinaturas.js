const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assinaturas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cursos',
        key: 'id'
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'assinaturas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "assinaturas_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "curso_id" },
          { name: "usuario_id" },
        ]
      },
    ]
  });
};
