const {Sequelize, sequelize} = require('./db');

const User = await sequelize.define('user', {
          name: Sequelize.STRING,
          email: Sequelize.STRING,
});

module.exports = User;