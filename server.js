#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('ata-auto-io:server');
var http = require('http');
var socket = require('socket.io');
var log = console.log;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

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

// Start Services

// Checkin
const childProcess = require('child_process');
let checkinServiceProcess = childProcess.fork('./checkinService.js');
checkinServiceProcess.on('message', async (message) => {
  log('> Server got msg:', message);
});
checkinServiceProcess.send('start');

// Checkout
let checkoutServiceProcess = childProcess.fork('./checkoutService.js');
checkoutServiceProcess.on('message', async (message) => {
  log('> Server got msg:', message);
});
checkoutServiceProcess.send('start');
