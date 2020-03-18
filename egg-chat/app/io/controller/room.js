'use strict';
const { Controller } = require('egg');
class RoomController extends Controller {
  async addMessage() {
    const { ctx, app } = this;
    // {user,room,content}
    const message = ctx.args[0];
    let doc = await ctx.model.Message.create(message);
    doc = await ctx.model.Message.findById(doc._id).populate('user');
    // 此入应该是向某个房间内广播
    app.io.emit('messageAdded', doc.toJSON());
  }
  async getAllMessages() {
    const { ctx, app } = this;
    const room = ctx.args[0];
    const messages = await ctx.model.Message.find({ room }).populate('user').sort({ createAt: -1 })
      .limit(20);
    ctx.socket.emit('allMessages', messages.reverse());
  }
}
module.exports = RoomController;
