const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

const key = sequelize.define('resource_keys', {
    ID: {
      type: DataTypes.INTEGER,
    },
    NUMBER:{
      type: DataTypes.INTEGER,
    },
    LABDOOR_NUM:{
      type: DataTypes.INTEGER,
    },
    STATUS:{
      type: DataTypes.INTEGER,
    },
},{
  tableName: 'resource_keys'
})

module.exports = key