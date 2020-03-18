'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoomSchema = new Schema({
    name: String,
    createAt: { type: Date, default: Date.now },
  });
  return mongoose.model('Room', RoomSchema);
};
