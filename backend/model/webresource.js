const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

// 实验室服务器
const webresource = sequelize.define('webresource_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    web_ID:{
      type: DataTypes.STRING,
    },
    web_type:{
      type: DataTypes.STRING,
    },
    web_status:{
      type: DataTypes.INTEGER,
    },
},{
  tableName: 'webresource_list'
})

module.exports = webresource