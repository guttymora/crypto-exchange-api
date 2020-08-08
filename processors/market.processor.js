const BaseProcessor = require('./base.processor');
const CurrencyDao = require('../daos/currency.dao');
const CoinCapService = require('../services/coincap.service');
const RESPONSE_CODES = require('../constants/response-codes.constant');

class MarketProcessor extends BaseProcessor {
    constructor(req, res) {
        super(req, res);

        this.currencyDao = new CurrencyDao();
    }

    async getAll() {
        console.log('[MarketProcessor] -> getAll()');

        const dbResponse = await this.currencyDao.getAll();
        if (dbResponse.rc !== RESPONSE_CODES.PROCESS_OK) {
            return this.handleResponse(dbResponse);
        }

        const currencyNames = dbResponse.bean.map((currency) => currency.name);
        const service = new CoinCapService();
        let serviceResponse = await service.getAssets(currencyNames);

        if (serviceResponse.rc !== RESPONSE_CODES.PROCESS_OK) {
            return this.handleResponse(dbResponse);
        }

        // Updating database values from third-party service
        const dbAssets = dbResponse.bean;
        const serviceAssets = serviceResponse.bean;

        dbAssets.forEach(currency => {
            const paired = serviceAssets.filter(asset => asset.symbol === currency.symbol);
            if(paired.length > 0) {
                currency.priceUsd = parseFloat(paired[0]['priceUsd']);
                currency.tradingVolumeUsd = parseFloat(paired[0]['volumeUsd24Hr']);
                currency.maxSupply = parseFloat(paired[0]['maxSupply']);
                // Updating values in database
                currency.save();
            }
        });
        serviceResponse.bean = dbAssets;

        return this.handleResponse(serviceResponse);
    }
}

module.exports = MarketProcessor;
