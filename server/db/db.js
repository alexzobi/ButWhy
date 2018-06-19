const Sequelize = require('sequelize');

const database = 'butwhy'

const db = new Sequelize(`postgres://localhost:5432/${database}`, {
  logging: false

});

module.exports = db;