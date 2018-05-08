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
    create: (req, res) =>{
        User.findOne({_id: req.body.id}, (err, user)=>{
            if(user.identity == "captain"){
                let newEvent = new CaptainEvent(req.body.event);
                newEvent.created_by = user._id;
                user.created_events.push(newEvent);
                newEvent.save((err)=>{
                    if(err){
                        res.json('Can not save new event!');
                    }else{
                        user.save((err)=>{
                            if(err){
                                res.json('Can not save user!');
                            }else{
                                res.redirect(303,'/allevents');
                            }
                        });
                    }
                });
            }else{
                res.json('You are not a captain!');
            }
        });
        
    },
};