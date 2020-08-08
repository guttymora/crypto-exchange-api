const HTTP_STATUS = require('../constants/http-status.constant');
const RESPONSE_CODES = require('../constants/response-codes.constant');

class BaseService {
    handleResponse(response) {
        switch(response.status) {
            case HTTP_STATUS.PROCESS_OK:
                return {
                    rc: RESPONSE_CODES.PROCESS_OK,
                    msg: 'Process OK',
                    bean: response.data.data
                };
            case HTTP_STATUS.NOT_FOUND:
                return {
                    rc: RESPONSE_CODES.SERVER_ERROR,
                    msg: 'Service not found',
                };
            case HTTP_STATUS.SERVER_ERROR:
                return {
                    rc: RESPONSE_CODES.SERVER_ERROR,
                    msg: 'Error in third-party service',
                };
        }
    }
}

module.exports = BaseService;
