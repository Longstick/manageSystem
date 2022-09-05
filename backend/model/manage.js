const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

const manage = sequelize.define('a_manage_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    am_account:{
      type: DataTypes.STRING,
    },
    am_password:{
      type: DataTypes.STRING,
    },
    am_limit:{
      type: DataTypes.STRING,
    },
},{
  tableName: 'a_manage_list'
})

module.exports = manage