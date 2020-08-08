const BaseProcessor = require('./base.processor');
const CoinCapService = require('../services/coincap.service');
const RESPONSE_CODES = require('../constants/response-codes.constant');
const CurrencyDao = require('../daos/currency.dao');

class RateProcessor extends BaseProcessor {
    constructor(req, res) {
        super(req, res);

        this.currencyDao = new CurrencyDao();
    }

    async getRate() {
        const currency = this.request.params.currency.toUpperCase();
        let dbResponse = await this.currencyDao.getNameBySymbol(currency);
        if(dbResponse.rc !== RESPONSE_CODES.PROCESS_OK) {
            return this.handleResponse(dbResponse);
        }

        const service = new CoinCapService();
        let response = await service.getRate(dbResponse.bean.name);

        if (response.rc !== RESPONSE_CODES.PROCESS_OK) {
            response = await this.currencyDao.getRate(currency);
            return this.handleResponse(response);
        }

        response.bean = {
            name: response.bean['id'],
            symbol: response.bean['symbol'],
            priceUsd: parseFloat(response.bean['rateUsd']),
        };

        return this.handleResponse(response);
    }
}

module.exports = RateProcessor;
