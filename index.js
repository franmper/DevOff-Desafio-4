const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');

app.use(cors());
app.use(express.static('public'));

const server = app.listen(8080, () => console.log('server on'))

const io = socket(server);

const users = [];

io.on('connection', socket => {
   socket.on('chat', message => {
      users.push(message);
      io.sockets.emit('chat', message);
   })
   socket.on('users', users => {
      io.sockets.emit('users', users);
   })
})