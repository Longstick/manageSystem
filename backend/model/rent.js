const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

const rent = sequelize.define('rent_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    user_ID:{
      type: DataTypes.STRING,
    },
    rent_time:{
      type: DataTypes.STRING,
    },
    return_time:{
      type: DataTypes.STRING,
    },
    resourse_type: {
      type: DataTypes.STRING,
    },
    resourse_ID:{
      type: DataTypes.STRING,
    },
},{
  tableName: 'rent_list'
})

module.exports = rent