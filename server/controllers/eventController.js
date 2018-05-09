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
    getAllEvents: (req, res) =>{
        let allEvents = [];
        StudentEvent.find({}, (err, studentevents)=>{
            if(err){
                res.json({err:err});
            }else{
                allEvents = allEvents.concat(studentevents);
                CaptainEvent.find({}, (err, captainevents)=>{
                    if(err){
                        res.json({err:err});
                    }else{
                        allEvents = allEvents.concat(captainevents);
                        res.json(allEvents);
                    }
                });
            }
        });        
    },
};