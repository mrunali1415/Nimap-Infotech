const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assuming db.js exports the Sequelize instance

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;
