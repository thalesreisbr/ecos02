const { Model, DataTypes } = require('sequelize');


class Perfil extends Model {
  static init(sequelize) {
    super.init({
        active: DataTypes.BOOLEAN,
        perfil: DataTypes.STRING,
    }, {
      sequelize
    });

  }
  static associate(models){
    
  }
}
module.exports = Perfil;