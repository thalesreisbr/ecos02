const { Model, DataTypes } = require('sequelize');


class Address extends Model {
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
module.exports = Address;