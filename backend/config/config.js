const config = {
  host: 'localhost', 
  database: 'zjhdata',
  username: 'root',
  password: 'Ewqa320@',
  dialect: 'mysql',
  timezone: '+08:00',
  // port: 8011,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
}
};

module.exports = config