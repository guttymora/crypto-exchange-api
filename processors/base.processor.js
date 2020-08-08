const RESPONSE_CODES = require('../constants/response-codes.constant');

class BaseProcessor {
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    handleResponse(response, customHttpCode = null) {
        let status = 500;
        switch (response.rc) {
            case RESPONSE_CODES.PROCESS_OK:
                status = customHttpCode || 200;
                break;
            case RESPONSE_CODES.NOT_FOUND:
                status = 404;
                break;
            case RESPONSE_CODES.SERVER_ERROR:
            default:
                status = 500;
                break;
        }

        this.response.status(status).send(response);
    }
}

module.exports = BaseProcessor;
