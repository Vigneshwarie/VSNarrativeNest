const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

User.init(
     {
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          first_name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          last_name: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail:true,
               },
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    len: [8],
                    isAlphanumeric:true,
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName:'user',
          
     }
);

module.exports = User;
