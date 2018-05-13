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
  address: {type: String, required: false},
  joined_events: [{type: Schema.Types.ObjectId, ref: "Event"}],
  created_events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  experience: {type: Number},
  boat_name: {type: String},
  spec: {type: String}
}, {
  usePushEach: true
})
var User = mongoose.model("User", UserSchema);

var UserInfoSchema = new mongoose.Schema({
  password: {type: String},
  user: {type: Schema.Types.ObjectId, ref: "User"}
})
var UserInfo = mongoose.model("UserInfo", UserInfoSchema);

var StudentEventSchema = new mongoose.Schema({
  date: {type: Date, required: false},
  title: {type: String, required: false},
  timeFrom: {type: String, required: false},
  timeTo: {type: String, required: false},
  message: {type: String, required: false},
  created_by: {type: Schema.Types.ObjectId, ref: "User"},
  people_joined: [{ type: Schema.Types.ObjectId, ref: "User" }]
})
var StudentEvent = mongoose.model("StudentEvent", StudentEventSchema);

var CaptainEventSchema = new mongoose.Schema({
  date: { type: Date, required: false },
  title: {type: String, required: false},  
  timeFrom: { type: String, required: false },
  timeTo: { type: String, required: false },
  message: { type: String, required: false },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  people_joined: [{ type: Schema.Types.ObjectId, ref: "User" }],
  vessel: {type: String, required: false},
  spec: {type: String, required: false},
  NumOfCrew: {type: String, required: false}
})
var CaptainEvent = mongoose.model("CaptainEvent", CaptainEventSchema);