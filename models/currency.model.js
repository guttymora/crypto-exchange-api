const {Sequelize, DataTypes} = require('sequelize');
const db = require('../database/database');

const Currency = db.define('currencies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    priceUsd: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'price_usd'
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    tradingVolumeUsd : {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'trading_volume_usd'
    },
    maxSupply: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'max_supply'
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'crypto',
        field: 'currency_type'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at'
    },
}, {
    tableName: 'currencies',
    timestamps: false,
    underscored: true
});

module.exports = Currency;
