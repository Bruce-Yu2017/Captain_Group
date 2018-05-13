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
    getAllEvents: (req, res) => {
        let allEvents = [];
        StudentEvent.find({}, (err, studentevents) => {
            if (err) {
                res.json({ err: err });
            } else {
                allEvents = allEvents.concat(studentevents);
                CaptainEvent.find({}, (err, captainevents) => {
                    if (err) {
                        res.json({ err: err });
                    } else {
                        allEvents = allEvents.concat(captainevents);
                        res.json(allEvents);
                    }
                });
            }
        });
    },

    deleteEvent: (req, res) => {
        var event_id = req.params.id;
        var identity = req.params.identity;
        if (identity == "captain") {
            CaptainEvent.remove({ _id: event_id }, (err) => {
                if (err) {
                    console.log("delete err: ", err);
                }
                else {
                    res.redirect(303, '/allevents');
                }
            })
        }
        else if (identity == "student") {
            StudentEvent.remove({ _id: event_id }, (err) => {
                if (err) {
                    console.log("delete err: ", err);
                }
                else {
                    res.redirect(303, '/allevents');
                }
            })
        }
    },

    updateEvent: (req, res) => {
        console.log('req: ', req.body);
        CaptainEvent.findOne({_id: req.params.id},function(err, capEvent) {
            if(err) {
                console.log("update cap event err: ", err);
            }
            else {
                console.log('capEvent: ', capEvent);
                capEvent.save((err) => {
                    res.redirect(303, '/allevents');
                })
            }
        })
            

    }
};