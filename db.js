const path = require('path');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

// TODO - create the new sequelize connection

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
})

async() => {try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
        } catch (error) {
          console.error('Unable to connect to the database:', error);
        }
}

module.exports = {
    sequelize,
    Sequelize
};

