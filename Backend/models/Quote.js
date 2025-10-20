const mongoose = require('mongoose');

// Schema
const QuoteSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

// Model
const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;