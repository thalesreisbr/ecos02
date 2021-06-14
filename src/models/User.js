const {Model, DataTypes, Op} = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            name : DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            document: DataTypes.STRING,
            gender: DataTypes.STRING,
            birth_date : DataTypes.DATE,
        },{
            sequelize
        });
    }
    static associate(models){
        this.belongsTo(models.Address,{foreignKey:"address_id", as :"address"});
    }  
    
}
module.exports = User;