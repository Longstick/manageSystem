const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)
const moment = require('moment');

// 设备 库存
const resourceManage = sequelize.define('r_manage_list', {
  resourceID:{
    type: DataTypes.INTEGER,
    primaryKey: true
  },
    resourcetype:{
      type: DataTypes.STRING,
    },
    resourceName: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.BIGINT,
    },
    rm_updatetime: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('rm_updatetime')).format('YYYY-MM-DD HH:mm:ss');
    }
    }
},{
  tableName: 'r_manage_list',
  timestamps: true,
  createdAt:false,
  updatedAt: 'rm_updatetime'
});

(async function() {
  await resourceManage.sync({alter: true})
  console.log('resourceManage模型同步完毕');
})();

module.exports = resourceManage