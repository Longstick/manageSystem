const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

// 设备分布
const equip = sequelize.define('e_total_list', {
    ID: {
      type: DataTypes.INTEGER,
    },
    et_college:{
      type: DataTypes.STRING,
    },
    et_equipID:{
      type: DataTypes.STRING,
    },
    et_classID: {
      type: DataTypes.STRING,
    },
    et_type: {
      type: DataTypes.STRING,
    },
    et_equipstatus: {
      type: DataTypes.STRING,
    }
},{
  tableName: 'e_total_list'
})

module.exports = equip