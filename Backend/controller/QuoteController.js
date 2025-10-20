const asyncHandler = require('express-async-handler');
const Quote = require('../models/Quote');


const getQuotes = asyncHandler(async(req, res) =>{
    try {
        const { name, email, phone, message } = req.body;
        const newQuote = new Quote({ name, email, phone, message });
        await newQuote.save();
        res.status(201).json({ success: true, message: "Quote saved successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


module.exports = {
    getQuotes,
};