const RESPONSE_CODES = require('../constants/response-codes.constant');
const CurrencyModel = require('../models/currency.model');
const CURRENCY_STATUS = require('../constants/currency-status.constant');
const Op = require('sequelize').Op;

class CurrencyDao {
    constructor() {
        this.response = {
            rc: RESPONSE_CODES.DATABASE_ERROR,
            msg: 'Database error',
            bean: null
        };
    }

    /**
     * Get all currencies
     * @param columns: Specifies the columns to be searched
     * @returns {Promise<{msg: string, rc: number, bean: null}|*>}
     */
    async getAll(...columns) {
        console.log('[Currency DAO] -> getAll()');
        try {
            const options = {
                where: {status: CURRENCY_STATUS.ACTIVE},
            };
            if (columns && columns.length > 0) {
                options.attributes = columns
            }
            const result = await CurrencyModel.findAll(options);
            if (!result || result.length === 0) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result;
            }
        } catch (err) {
            console.log(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async getByName(all = true, ...names) {
        console.log('[Currency DAO] -> getByName()');
        try {
            const queryType = all ? 'findAll' : 'findOne';
            const result = await CurrencyModel[queryType]({
                where: {name: {[Op.in]: names}}
            });
            if (!result || result.length === 0) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result;
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async getNameBySymbol(symbol) {
        console.log('[Currency DAO] -> getNameBySymbol()');
        try {
            const result = await CurrencyModel.findOne({
                attributes: ['name'],
                where: {symbol: symbol}
            });
            if (!result) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result;
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async getRate(symbol) {
        console.log('[Currency DAO] -> getRate()');
        try {
            const result = await CurrencyModel.findOne({
                attributes: ['name', 'symbol', 'price_usd'],
                where: {symbol: symbol}
            });
            if (!result) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result;
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async getById(id) {
        console.log('[Currency DAO] -> getById()');
        try {
            const result = await CurrencyModel.findOne({
                where: {id: id}
            });
            if (!result) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result;
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async create(data) {
        console.log('[Currency DAO] -> create()');
        try {
            const result = await CurrencyModel.create(data);
            this.response.rc = RESPONSE_CODES.PROCESS_OK;
            this.response.msg = 'Process OK';
            this.response.bean = result;
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async updateById(id, data) {
        console.log('[Currency DAO] -> updateById()');
        try {
            const result = await CurrencyModel.update(data,
                {where: {id: id}, returning: true}
            );
            if (!result || result[0] === 0) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result[1][0];
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async updateByName(name, data) {
        console.log('[Currency DAO] -> updateByName()');
        try {
            const result = await CurrencyModel.update(data,
                {where: {name: name.toLowerCase()}, returning: true}
            );
            if (!result || result[0] === 0) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = result[1][0];
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }

    async updatePrice(id, value) {
        console.log('[Currency DAO] -> updatePrice()');
        try {
            const currency = await CurrencyModel.findOne({where: {id: id}});
            if (!currency) {
                this.response.rc = RESPONSE_CODES.NOT_FOUND;
                this.response.msg = 'No currencies found'
            } else {
                currency.priceUsd = value;
                await currency.save();
                this.response.rc = RESPONSE_CODES.PROCESS_OK;
                this.response.msg = 'Process OK';
                this.response.bean = currency;
            }
        } catch (err) {
            console.error(`[!] [${this.constructor.name}] Error en BD: ${err}`);
            this.response.msg = err.toString();
        } finally {
            return this.response;
        }
    }
}

module.exports = CurrencyDao;
