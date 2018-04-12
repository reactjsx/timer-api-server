const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    title: String,
    project: String,
    startedFrom: Number,
    elapsedTime: Number
});

module.exports = mongoose.model('Timer', timerSchema);