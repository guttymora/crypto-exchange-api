const BaseProcessor = require('./base.processor');
const CurrencyDao = require('../daos/currency.dao');

class CurrencyProcessor extends BaseProcessor {
    constructor(req, res) {
        super(req, res);

        this.currencyDao = new CurrencyDao();
    }

    async getAll() {
        console.log('[CurrencyProcessor] -> getAll()');
        return this.handleResponse(
            await this.currencyDao.getAll()
        )
    }

    async get() {
        console.log('[CurrencyProcessor] -> get()');
        return this.handleResponse(
            await this.currencyDao.getById(this.request.params.id)
        )
    }

    async create() {
        console.log('[CurrencyProcessor] -> create()');
        return this.handleResponse(
            await this.currencyDao.create(this.request.body)
        );
    }

    async updateCurrency() {
        console.log('[CurrencyProcessor] -> updateCurrency()');
        return this.handleResponse(
            await this.currencyDao.updateById(this.request.params.id, this.request.body)
        );
    }

    async updatePrice() {
        console.log('[CurrencyProcessor] -> updatePrice()');
        return this.handleResponse(
            await this.currencyDao.updatePrice(this.request.params.id, this.request.body.priceUsd)
        );
    }
}

module.exports = CurrencyProcessor;
