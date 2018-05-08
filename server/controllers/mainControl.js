var mongoose = require('mongoose');
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

    login: (req, res) => {

    }
}