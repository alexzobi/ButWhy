const User = require('./user');
const Game = require('./game');

User.belongsToMany(Game, {through: 'user_game'});
Game.belongsToMany(User, {through: 'user_game'});

module.exports = {
	User,
	Game
}