const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-projekt-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;