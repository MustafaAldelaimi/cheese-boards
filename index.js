const User = require('./User');
const Board = require('./Board');
const Cheese = require('./Cheese');

Board.belongsTo(User);
User.hasMany(Board, {as: 'boards'});

Board.belongsToMany(Cheese, {through: 'BoardCheese', as: 'cheese'});
Cheese.belongsToMany(Board, {through: 'BoardCheese', as: 'boards'});


module.exports = {
          User,
          Board,
          Cheese
}