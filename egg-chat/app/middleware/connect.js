'use strict';
const SYSTEM = {
  name: '系统',
  email: 'admin@126.com',
  avatar: 'http://www.gravatar.com/avatar/1e6fd8e56879c84999cd481255530592',
};
module.exports = app => {
  return async function(ctx, next) {
    const { app, socket, query: { token, room } } = ctx;
    if (token && token != '') {
      const user = app.jwt.verify(token, app.config.jwt.secret);
      if (user) {
        const id = socket.id;
        const nsp = app.io;
        await ctx.model.User.findByIdAndUpdate(user._id, {
          $set: { online: true, room },
        });
        socket.join(room);
        socket.broadcast.to(room).emit('online', {
          user: SYSTEM,
          content: `用户${user.name}加入聊天室`,
        });
        await next();
        await ctx.model.User.findByIdAndUpdate(user._id, {
          $set: { online: false, room: null },
        });
        socket.leave(room);
        socket.broadcast.to(room).emit('offline', {
          user: SYSTEM,
          content: `用户${user.name}离开聊天室`,
        });
      } else {
        socket.emit('needLogin');
      }
    } else {
      socket.emit('needLogin');
    }
  };
};
