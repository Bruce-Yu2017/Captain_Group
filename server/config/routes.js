var mainroutes = require('../controllers/mainControl.js');
var path = require('path');


module.exports = function(app){
  //register
  app.post("/register", function (req, res) {
    mainroutes.register(req, res);
  })
  //login
  app.post("/login", function (req, res) {
    mainroutes.login(req, res);
  })

}