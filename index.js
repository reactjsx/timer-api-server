const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      
const app = express();
mongoose.connect('mongodb://techexplained:thaonguyen2604@ds241039.mlab.com:41039/timer_tracking_app');
const Timer = require('./models/timer');

app.get('/', function(req, res) {
  res.redirect('/api/timers');
});

app.get('/api/timers', function(req, res) {
  Timer.find({}, function(err, timers) {
    if (err) {
      console.log(err);
    } else {
      res.json(timers);
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server started at: ', process.env.IP + ':' + process.env.PORT);
})