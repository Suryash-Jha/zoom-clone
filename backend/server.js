const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server} = require('socket.io')
const app = express();
const server = createServer(app);
const io= new Server(server)
const { v4: uuidv4 } = require('uuid');

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });
// For rendering static HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.get('/chatView/:id', (req, res) => {
  res.sendFile(join(__dirname, 'chat.html'));
});

app.get('/generate-id', (req, res)=>{
  const id= uuidv4()
  console.log(id)
  res.send({
    id
  })
})

let c= 0;

io.on('connection', (socket)=>{
    console.log('connected!!!')
    socket.on('message', (msg, roomId)=>{
        console.log("Message recieved from client->", msg)
        socket.broadcast.to(roomId).emit('message', msg)
    })
    socket.on('join-room', (roomId) => {
        console.log('Room Joined: ', roomId);
        socket.join(roomId)
        c+= 1;
        socket.to('mainPage').emit('count', 'Count is :'+ c)
      });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        // c-= 1;
        // socket.to('mainPage').emit('count', 'Count is :'+ c)
      });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});