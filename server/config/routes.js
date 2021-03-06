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

// Get all users
  app.get('/alllogin', function(req, res) {
    mainroutes.getAllUsers(req, res);
  })

//delete user
    app.delete("/deleteUser/:email", function(req, res) {
      console.log("APP.DELETE");
      mainroutes.deleteUser(req, res);
    })


  app.get("/activate_new/:token", function(req, res) {
    mainroutes.activate(req, res);
  })

  app.post('/forgetpw',(req, res) =>{
    mainroutes.forgetpw(req, res);
  })

  app.put('/resetpw',(req, res) =>{
    mainroutes.resetpw(req, res);
  })

  app.delete("/delete/:id/:identity", function(req, res) {
    events.deleteEvent(req, res);
  });


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

  //delete events
  app.delete("/delete/:id/:identity", function(req, res) {
    events.deleteEvent(req, res);
  })

  //captain update
  app.put("/update/:id", function (req, res) {
    events.updateEvent(req, res);
  })


  app.all("*", function (req, res) {
    res.sendFile('index.html', { root: './client/dist' });
  })
};

