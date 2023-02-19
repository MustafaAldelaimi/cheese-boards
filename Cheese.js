const {Sequelize, sequelize} = require('./db');

const Cheese = await sequelize.define('cheese', {
          title: Sequelize.STRING,
          description: Sequelize.STRING,
});

module.exports = Cheese;