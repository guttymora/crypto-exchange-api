const express = require('express');
const router = express.Router();
const RequestMiddleware = require('../middlewares/request.middleware');
const CurrencyProcessor = require('../processors/currency.processor');

// Get all currencies price
router.get('/', (req, res) => {
    const processor = new CurrencyProcessor(req, res);
    return processor.getAll();
});

router.post('/', RequestMiddleware.validateCurrencyBody, (req, res) => {
    const processor = new CurrencyProcessor(req, res);
    return processor.create();
});

router.patch('/price/:id', (req, res) => {
    const processor = new CurrencyProcessor(req, res);
    return processor.updatePrice();
});

router.get('/:id', (req, res) => {
    const processor = new CurrencyProcessor(req, res);
    return processor.get();
});

router.put('/:id', (req, res) => {
    const processor = new CurrencyProcessor(req, res);
    return processor.updateCurrency();
});

module.exports = router;
