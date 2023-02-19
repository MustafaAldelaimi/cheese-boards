const {Sequelize, sequelize} = require('./db');

const Board = await sequelize.define('board', {
          type: Sequelize.STRING,
          description: Sequelize.STRING,
          rating: Sequelize.INTEGER,
});

module.exports = Board;