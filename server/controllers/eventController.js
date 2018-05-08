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
        StudentEvent.find({}, (err, events)=>{
            if(err){
                res.json({err:err});
            }else{
                allEvents.concat(events);
            }
        });
        CaptainEvent.find({}, (err, events)=>{
            if(err){
                res.json({err:err});
            }else{
                allEvents.concat(events);
            }
        });
        res.json(allEvents);        
    },
};