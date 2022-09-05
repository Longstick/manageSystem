const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)
const moment = require('moment');

// 设备分布
const resourceDistribute = sequelize.define('r_distribute_list', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    rd_userID:{
      type: DataTypes.STRING,
    },
    update_time:{
      type: Sequelize.DATE,
      get() {
          return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    rd_status: {
      type: DataTypes.INTEGER,
      // 1 借 2还
    },
    resourceName: {
      type: DataTypes.STRING,
    },
    resourcetype: {
      type: DataTypes.STRING,
    },
    resourceID: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.BIGINT,
    }
},{
  tableName: 'r_distribute_list',
  timestamps: true,
  createdAt: false,
  updatedAt: 'update_time'
});

(async function() {
  await resourceDistribute.sync({alter: true})
  console.log('resourceDistribute模型同步完毕');
})();


module.exports = resourceDistribute