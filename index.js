const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      
const app = express();
mongoose.connect('mongodb://techexplained:thaonguyen2604@ds143099.mlab.com:43099/react_timer_tracking_app');
const Timer = require('./models/timer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.post('/api/timers', function(req, res) {
  const newTimer = {
    id: req.body.id,
    title: req.body.title,
    project: req.body.project,
    elapsedTime: req.body.elapsedTime,
    startedFrom: req.body.startedFrom
  };
  Timer.create(newTimer, function(err, timer) {
    if (err) {
      console.log(err);
    }
  });
  res.json({});
});

app.put('/api/timers', function(req, res) {
  Timer.findOne({id: req.body.id}, function(err, foundTimer) {
    if (err) {
      console.log(err);
    } else {
      foundTimer.title = req.body.title;
      foundTimer.project = req.body.project;
      foundTimer.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  res.json({});
});

app.delete('/api/timers', function(req, res) {
  Timer.remove({id: req.body.id}, function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json({});
});

app.post('/api/timers/start', function(req, res) {
  Timer.findOne({id: req.body.id}, function(err, foundTimer) {
    if (err) {
      console.log(err);
    } else {
      foundTimer.startedFrom = req.body.startedFrom;
      foundTimer.save(function(err) {
        console.log(err);
      });
      res.json({});
    }
  });
});

app.post('/api/timers/stop', function(req, res) {
  Timer.findOne({id: req.body.id}, function(err, foundTimer) {
    if (err) {
      console.log(err);
    } else {
      foundTimer.elapsedTime = req.body.elapsedTime;
      foundTimer.startedFrom = null;
      if (req.body.doneAt) {
        foundTimer.doneAt = req.body.doneAt;
      }
      foundTimer.save(function(err) {
        console.log(err);
      });
      res.json({});
    }
  });
  
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server started at: ', process.env.IP + ':' + process.env.PORT);
})