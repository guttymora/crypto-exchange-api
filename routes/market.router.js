const express = require('express');
const router = express.Router();
const MarketProcessor = require('../processors/market.processor');

// Get all currencies price
router.get('/', (req, res) => {
    const processor = new MarketProcessor(req, res);
    return processor.getAll();
});

module.exports = router;
