const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    id: String,
    title: String,
    project: String,
    startedFrom: Number,
    elapsedTime: Number,
    doneAt: Number
});

module.exports = mongoose.model('Timer', timerSchema);