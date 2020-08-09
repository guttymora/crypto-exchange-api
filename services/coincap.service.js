const axios = require('axios');
const BASE_URL = 'https://api.coincap.io/v2';
const BaseService = require('./base.service');
const HTTP_STATUS = require('../constants/http-status.constant');

class CoinCapService extends BaseService {
    async getAssets(...currencies) {
        console.log('[CoinCapService] -> getAssets()');
        if(!currencies || currencies.length === 0) {
            currencies = ['bitcoin', 'ethereum', 'dash'];
        }
        const ENDPOINT = `/assets?ids=${currencies.join(',')}`;
        let response;
        try {
            response = await axios.get(BASE_URL + ENDPOINT);
        } catch (err) {
            if(err.code && err.code === ''){
                err.status = HTTP_STATUS.CONNECTION_REFUSED;
            }
            console.error(`[!] CoinBaseService error: ${this.constructor.name}: ${err}`);
            response = err;
        } finally {
            return this.handleResponse(response);
        }
    }

    async getRate(currency) {
        console.log('[CoinCapService] -> getRate()');
        const ENDPOINT = `/rates/${currency}`;
        let response;
        try {
            response = await axios.get(BASE_URL + ENDPOINT);
            if (!response.data.data) {
                response.status = HTTP_STATUS.NOT_FOUND
            }
        } catch (err) {
            console.error(`[!] CoinBaseService error: ${this.constructor.name}: ${err}`);
            if(!err.status) {
                err.status = HTTP_STATUS.SERVER_ERROR
            }
            response = err;
        } finally {
            return this.handleResponse(response);
        }
    }
}

module.exports = CoinCapService;
