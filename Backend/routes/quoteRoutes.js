const express = require('express');
const router = express.Router();
const {
    getQuotes,
 
} = require('../controller/QuoteController');


router.post('/quotes', getQuotes)

module.exports = router;