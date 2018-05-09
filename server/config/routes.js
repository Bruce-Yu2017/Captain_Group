var mainroutes = require('../controllers/mainControl.js');
var studentEvent = require('../controllers/studentController');
var captainEvent = require('../controllers/captainController');
var events = require('../controllers/eventController');
var path = require('path');


module.exports = function(app){
  //register
  app.post("/register", function (req, res) {
    mainroutes.register(req, res);
  });
  //login
  app.post("/login", function (req, res) {
    mainroutes.login(req, res);
  });


  app.get("/activate/:token", function(req, res) {
    mainroutes.activate(req, res);
  })



  // create student event
  app.post('/studentevents', function(req, res){
    studentEvent.create(req, res);
  });

  // create captain event
  app.post('/captainevents', function(req, res){
    captainEvent.create(req, res);
  });

  // get all events
  app.get('/allevents', function(req, res){
    events.getAllEvents(req, res);
  });

};

