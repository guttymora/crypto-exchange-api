const RESPONSE_CODES = require('../constants/response-codes.constant');
const HTTP_STATUS = require('../constants/http-status.constant');

const rules = ['name', 'symbol', 'priceUsd'];

class RequestMiddleware {
    static validateCurrencyBody(req, res, next) {
        console.log(req.body);
        if (typeof req.body !== 'object') {
            res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
                rc: RESPONSE_CODES.BAD_REQUEST,
                msg: 'Invalid request'
            })
        } else {
            const errors = [];
            for (let rule of rules) {
                console.log('RULE:', rule);
                if (!req.body.hasOwnProperty(rule)) {
                    errors.push(`Invalid attribute: ${rule}`);
                }
            }

            if (errors.length !== 0) {
                res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
                    rc: RESPONSE_CODES.BAD_REQUEST,
                    msg: 'Invalid request',
                    errors
                })
            } else {
                next();
            }
        }
    }
}

module.exports = RequestMiddleware;
