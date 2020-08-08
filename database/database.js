require('dotenv').config();
const {Sequelize} = require('sequelize');
const pg = require('pg');

// Remove time zone from date fields
pg.types.setTypeParser(1114, string => string);

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    protocol: 'postgres',
    host: process.env.DB_URL,
    port: parseInt(process.env.BD_PORT),
    pool: {
        max: parseInt(process.env.DB_MAX),
        idle: parseInt(process.env.DB_IDLE_TIMEOUT),
        acquire: parseInt(process.env.DB_CONNECTION_TIMEOUT),
    },
    timezone: process.env.TIME_ZONE
});

// To connect: db.authenticate()
// To close: db.close()

module.exports = db;
