'use strict';
const BaseController = require('./base');
class RoomsController extends BaseController {
  async createRoom() {
    const { ctx, app } = this;
    const room = ctx.request.body;
    let doc = await ctx.model.Room.findOne({ name: room.name });
    if (doc) {
      this.error('房间已经存在!');
    } else {
      doc = await ctx.model.Room.create(room);
      this.success(doc.toJSON());
    }
  }
  async getAllRooms() {
    const { ctx, app } = this;
    let rooms = await ctx.model.Room.find();
    rooms = rooms.map(room => room.toJSON());
    for (let i = 0; i < rooms.length; i++) {
      const users = await ctx.model.User.find({ room: rooms[i]._id });
      rooms[i].users = users.map(user => user.toJSON());
    }
    this.success(rooms);
  }
}
module.exports = RoomsController;
