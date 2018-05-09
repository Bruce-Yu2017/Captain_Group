var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  identity: {type: String, required: true},
  token: { type: String, required: false },
  status: {type: Number, default: 0},
  userInfo: { type: Schema.Types.ObjectId, ref: "UserInfo"},
  email: {type: String, required: true, index: {unique: true}},
  phone: {type: Number, required: true},
  address: {type: String, required: true},
  joined_events: [{type: Schema.Types.ObjectId, ref: "Event"}],
  created_events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  experience: {type: Number},
  boat_name: {type: String},
  spec: {type: String}
})
var User = mongoose.model("User", UserSchema);

var UserInfoSchema = new mongoose.Schema({
  password: {type: String},
  user: {type: Schema.Types.ObjectId, ref: "User"}
})
var UserInfo = mongoose.model("UserInfo", UserInfoSchema);

var StudentEventSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  title: {type: String, required: false},
  timeFrom: {type: String, required: true},
  timeTo: {type: String, required: true},
  message: {type: String, required: true},
  created_by: {type: Schema.Types.ObjectId, ref: "User"},
  people_joined: [{ type: Schema.Types.ObjectId, ref: "User" }]
})
var StudentEvent = mongoose.model("StudentEvent", StudentEventSchema);

var CaptainEventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: {type: String, required: false},  
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  message: { type: String, required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  people_joined: [{ type: Schema.Types.ObjectId, ref: "User" }],
  vessel: {type: String, required: true},
  spec: {type: String, required: true},
  NumOfCrew: {type: Number, required: true}
})
var CaptainEvent = mongoose.model("CaptainEvent", CaptainEventSchema);