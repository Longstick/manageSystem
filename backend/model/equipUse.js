const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

// 设备分布
const equipUse = sequelize.define('e_usage_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    eu_resourcetype:{
      type: DataTypes.STRING,
    },
    eu_resourceID:{
      type: DataTypes.STRING,
    },
    eu_time: {
      type: DataTypes.STRING,
    },
    eu_oprationtype: {
      type: DataTypes.INTEGER,
    },
    eu_count: {
      type: DataTypes.INTEGER,
    },
    eu_userID: {
      type: DataTypes.STRING,
    },
    eu_remark: {
      type: DataTypes.STRING,
    }
},{
  tableName: 'e_usage_list'
})

module.exports = equipUse