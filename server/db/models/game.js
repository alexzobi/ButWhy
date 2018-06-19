const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  winner: {
    type: Sequelize.STRING
  },
  players: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  date: {
    type: Sequelize.STRING,
    defaultValue: new Date()
  }
});

module.exports = Game