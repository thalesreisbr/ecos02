const { Model, DataTypes } = require('sequelize');


class Address extends Model {
  static init(sequelize) {
    super.init({
        country: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        city: DataTypes.STRING
    }, {
      sequelize
    });

  }
  static associate(models){
    this.hasOne(models.User,{foreignKey:'address_id', as : 'user'});
  }
}
module.exports = Address;