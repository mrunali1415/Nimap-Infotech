// db.js
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/config.json');

const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    define: {
        timestamps: false // Disable sequelize's automatic timestamp fields (createdAt and updatedAt)
    }
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
        // Synchronize Sequelize models with the database
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
