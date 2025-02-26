const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server} = require('socket.io')
const app = express();
const server = createServer(app);
const io= new Server(server)

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });
// For rendering static HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket)=>{
    console.log('connected!!!')
    socket.on('message', (msg)=>{
        console.log("Message recieved from client->", msg)
        socket.broadcast.emit('message', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});