const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server} = require('socket.io')
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});



io.on('connection', (socket)=>{
    // socket.broadcast.emit('messageIn', 'Connected by socket port 3001'+socket.id, )
    socket.on('message', (msg, room)=>{
        console.log("Message recieved from client->", msg)
        socket.broadcast.to(room).emit('message', msg)
    })
    socket.on('join-room', (roomId) => {
      console.log(socket, '---+_+_+_+')
        console.log('Room Joined: ', roomId, socket.rooms);
        socket.join(roomId)
      
      });
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});