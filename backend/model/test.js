const {Sequelize,DataTypes} = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config)

const testModel = sequelize.define('test', {
    test_id: {
      type: DataTypes.INTEGER,
    }
},{
  tableName: 'test'
})

module.exports = testModel