const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('perfis', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    perfil: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'perfis',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "perfis_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
