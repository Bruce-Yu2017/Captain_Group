const mongoose = require("mongoose");
const path = require("path");

const User = mongoose.model("User");
const UserInfo = mongoose.model("UserInfo");
const StudentEvent = mongoose.model("StudentEvent");
const CaptainEvent = mongoose.model("CaptainEvent");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secret = "captain";
module.exports = {
    register: (req, res) => {
      User.findOne({email: req.body.email}, (err, user) => {
        if(err) {
          console.log('register err: ', err);
        }
        else {
          if(user === null) {
            let hashed_password = bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              if(err) {
                console.log('hash err: ', err);
              }
              else {
                return hash;
              }
            });
            let new_user = new User({
              name: req.body.name,
              identity: req.body.identity,
              email: req.body.email,
              phone: req.body.phone,
              address: req.body.address,
              experience: req.body.experience,
              boat_name: req.body.boat_name,
              spec: req.body.spec,
            });
            new_user.token = jwt.sign({ email: new_user.email }, secret, { expiresIn: '1h' });
            new_user.save((err) => {
              if(err) {
                console.log("new user save err: ", err);
              }
              else {
                let userinfo = new UserInfo({
                  password: hashed_password,
                  user: new_user._id
                });
                
                userinfo.save((err) => {
                  if(err) {
                    console.log("userinfo save err: ", err);
                  }
                  else {
                    // res.json({success: "success register", user: new_user})
                    
                    var transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'foodreadyoh@gmail.com',
                        pass: 'codingdojo2018'
                      }
                    });

                    var content = `
                      <h1>Hello, ${new_user.name}.</h1> 
                      <p>You have a new account created by the admin of Greatpondyachtclub team. Please click on this link below to activate your account: </p>
                      <a href="http://localhost:8000/activate/${new_user.token}">Activate</a>
                      <p>This link will expire in 24 hours.</p>
                      <h3>Greatpondyachtclub team</h3>
                      `
                    var mailOptions = {
                      from: 'foodreadyoh@gmail.com',
                      to: new_user.email,
                      subject: 'Your new Greatpondyachtclub account',
                      html: content
                    };
          
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });
                    res.json("register pending");
                  }
                })
                
              }
            })
          }
          else {
            res.json({error: "This email has been registered."});
          }
        }
      })
    },

    activate: (req, res) => {
      User.findOne({token: req.params.token}, (err, user) => {
        if(err) {
          console.log("activate err: ", err);
        }
        else {
          user.status = 1;
          res.json({info: "activate success", user: user});
        }
      })
    },

    login: (req, res) => {
      User.findOne({email: req.body.email}, (err, login_user) => {
        if(err) {
          console.log("err from login: ", err);
        }
        else {
          if(login_user === null) {
            res.json({error: "Your input is invalid. Please try again."})
          }
          else if(login_user.status !== 1) {
            res.json({error: "Please activate your account by email."})
          }
          else {
            UserInfo.findOne({user: login_user._id}, (err, user) => {
              if(err) {
                console.log("user info err: ", err);
              }
              else {
                bcrypt.compare(req.body.password, user.password, (err, resp) => {
                  if(resp === true) {
                    res.json(login_user)
                  }
                  else {
                    res.json({error: "Your input is invalid. Please try again."})
                  }
                })
              }
            })
          }
        }
      })
    },
    
}