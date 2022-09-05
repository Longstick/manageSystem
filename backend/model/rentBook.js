const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)
const moment = require('moment');

const rentBook = sequelize.define('b_rent_list', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    book_ID:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_name:{
      type: DataTypes.STRING,
    },
    book_status: {
      type: DataTypes.INTEGER,
    },
    update_time: {
      type: Sequelize.DATE,
      get() {
          return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    user_ID: {
      type: DataTypes.STRING,
    }
},{
  tableName: 'b_rent_list',
  timestamps: true,
  createdAt:false,
  updatedAt: 'update_time'
});

(async function() {
  await rentBook.sync({alter: true})
  console.log('rentBook模型同步完毕');
})();



module.exports = rentBook