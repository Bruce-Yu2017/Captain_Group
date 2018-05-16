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
            var salt = bcrypt.genSaltSync(saltRounds);
            var hashed_password = bcrypt.hashSync(req.body.password, salt);
            if(req.body.identity === "captain") {
              var new_user = new User({
                name: req.body.name,
                identity: req.body.identity,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                experience: req.body.experience,
                boat_name: req.body.boat_name,
                spec: req.body.spec,
              });
            }
            else {
              var new_user = new User({
                name: req.body.name,
                identity: req.body.identity,
                email: req.body.email,
                phone: req.body.phone,
              });
            }
            
            new_user.token = jwt.sign({ email: new_user.email }, secret);
            new_user.save((err) => {
              if(err) {
                console.log("new user save err: ", err);
              }
              else {
                var userinfo = new UserInfo({
                  password: hashed_password,
                  user: new_user._id
                });
                
                userinfo.save((err) => {
                  if(err) {
                    console.log("userinfo save err: ", err);
                  }
                  else {
                    var transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'gpycwsp@gmail.com',
                        pass: 'WomenRuleGPYC'
                      }
                    });

                    var content = `
                      <h2>Hello ${new_user.name},</h2>
                      <p>You have opened a new account in Great Pond Yacht Club. </p><br>
                      <a href="http://localhost:8000/activate/${new_user.token}">Please activate your account here: Activate</a>
                      <h3>Greatpondyachtclub team</h3>
                      `
                    var mailOptions = {
                      from: 'gpycwsp@gmail.com',
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
                    res.json({success: "register pending"});
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
          user.save((err) => {
            res.json({user: user});
            var mailToOwner = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'gpycwsp@gmail.com',
                pass: 'WomenRuleGPYC'
              }
            });

            var content = `
                      <h1>There is a new user account just activated!</h1>
                      <p>User Name: ${user.name}</p>
                      <p>Identity: ${user.identity}</p>
                      `
            var mailOptions = {
              from: 'gpycwsp@gmail.com',
              to: "gpycwsp@gmail.com",
              subject: 'A New User Account Activated!',
              html: content
            };

            mailToOwner.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          })
          
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
            res.json({error: "Your Email is invalid. Please try again."})
          }
          else if(login_user.status !== 1) {
            res.json({error: "Please activate your account by email.", errorCode: 404});
          }
          else {
            UserInfo.findOne({user: login_user._id}, (err, user) => {
              if(err) {
                console.log("user info err: ", err);
              }
              else {
                bcrypt.compare(req.body.password, user.password, (err, resp) => {
                  if(resp === true) {
                    res.json(login_user);
                  }
                  else {
                    res.json({error: "Your Password is invalid. Please try again."})
                  }
                })
              }
            })
          }
        }
      })
    }, 
    getAllUsers: (req, res) => {
      let allUsers = [];
      User.find({}, (err, users) => {
        if(err) {
          res.json({err: err});
        } else {
          allUsers = allUsers.concat(users);
          res.json(allUsers);
        }
      });
    },
    deleteUser: (req, res) => {
      var user_email = req.params.email;
      console.log('user_email: ', user_email);
      User.remove({ email: user_email }, (err) => {
          if (err) {
            console.log("delete user err 2: ", err);
          }
          else {
            res.redirect(303, '/alllogin');
          }
        })
     },

     forgetpw: (req, res) => {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          console.log(err);          
        } else {
          if (!user) {
            res.json({err: "This email is invalid."});
          } else {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'gpycwsp@gmail.com',
                pass: 'WomenRuleGPYC'
              }
            });
  
            var content = `
              Hello,<br><br> You recently request a password rest link. Please click on the link below to reset your password: <br><br>
              <a href="http://localhost:8000/reset/${user.token}">Reset Password</a>
              `
  
            var mailList = [
              user.email
            ]
  
            var mailOptions = {
              from: 'gpycwsp@gmail.com',
              to: mailList,
              subject: 'Rest Password Link Request',
              html: content
            };
  
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.json({succ: "success send recovery link."})
              }
            });
          }
        }
      })  
    },

    resetpw(req, res){
      User.findOne({ token: req.body.token }, function(error, user) {
        UserInfo.findOne({user:user._id}, function(err, userInfo){
          if(err){
            console.log("find user info err",err);
          }else{
            var salt = bcrypt.genSaltSync(saltRounds);
            var hashed_password = bcrypt.hashSync(req.body.password, salt);
            userInfo.password = hashed_password;
            userInfo.save((err)=>{
              if(err){
                console.log(err);
              }else{
                res.json("success reset password")
              }
            })
          }
        })

      })
    }
  } 