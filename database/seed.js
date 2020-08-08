const CurrencyModel = require('../models/currency.model');

class Seed {
    static async up() {
        const result = await CurrencyModel.findAll();
        if(result.length > 0) {
            console.log('> Seeding is not necessary');
            return
        }

        await CurrencyModel.bulkCreate([
            {
                name: 'bitcoin',
                symbol: 'BTC',
                priceUsd: 11000.00,
                status: true,
                currency_type: 'crypto'
            },
            {
                name: 'dash',
                symbol: 'DASH',
                priceUsd: 99.00,
                status: true,
                currency_type: 'crypto'
            },
            {
                name: 'ethereum',
                symbol: 'ETH',
                priceUsd: 400.00,
                status: true,
                currency_type: 'crypto'
            },
            {
                name: 'bolívar',
                symbol: 'BS',
                priceUsd: 0.00001,
                status: true,
                currency_type: 'fiat'
            },
            {
                name: 'petro',
                symbol: 'PTR',
                priceUsd: 60.00,
                status: true,
                currency_type: 'crypto'
            }
        ]);
    }
}

module.exports = Seed;
