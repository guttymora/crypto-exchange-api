const express = require('express');
const router = express.Router();
const RateProcessor = require('../processors/rate.processor');

// Get price by specific currency
router.get('/:currency', (req, res) => {
    const processor = new RateProcessor(req, res);
    return processor.getRate();
});

module.exports = router;
