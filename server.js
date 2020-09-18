const express = require('express'),
  socket = require('socket.io'),
  PORT = 5000,
  app = express(),
  log = console.log,
  server = app.listen(PORT, function () {
    log(`http://localhost:${PORT}`);
  });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket setup
const io = socket(server);

io.on('connection', function (socket) {
  console.log(`${socket.id} connected`);
  socket.emit('connection', 'conntected successfully');
  socket.on('attendance', (msg) => {
    log(msg);
    // forward to android socket.io-client to checkin checkout automatic
    io.emit('attendance', msg);
  });
  socket.on('disconnect', () => {
    io.emit('user disconnected', socket.userId);
  });
});
