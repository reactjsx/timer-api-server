const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    title: String,
    startedAt: Number,
    elapsed: Number
});

module.exports = mongoose.model('Timer', timerSchema);