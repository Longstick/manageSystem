const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

const book = sequelize.define('book_list', {
    book_ID:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_name:{
      type: DataTypes.STRING,
    },
    book_type:{
      type: DataTypes.STRING,
    },
    book_status: {
      type: DataTypes.INTEGER,
    }
},{
  tableName: 'book_list'
});

(async function() {
  await book.sync({alter: true})
  console.log('book模型同步完毕');
})();

module.exports = book