const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

// 设备分布
const equipDistribute = sequelize.define('e_distribute_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    ed_college:{
      type: DataTypes.STRING,
    },
    ed_class:{
      type: DataTypes.INTEGER,
    },
    ed_classID: {
      type: DataTypes.STRING,
    },
    ed_equiptype: {
      type: DataTypes.STRING,
    },
    ed_equipcount: {
      type: DataTypes.INTEGER,
    }
},{
  tableName: 'e_distribute_list'
})

module.exports = equipDistribute