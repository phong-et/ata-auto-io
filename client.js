var socket = require('socket.io-client')
//('https://ata-auto-io.herokuapp.com'),
  ('http://localhost:5000'),
  log = console.log,
  attendance = require('./attendance');
(async () => {
  //   let res = await attendance.checkout();
  //   log(res);
  socket.on('connection', function (msg) {
    log(msg);
  });
  socket.on('attendance', function ({type, reason}) {
    log(type);
    switch (type) {
      case 'checkin':
        attendance.checkin(reason);
        break;
      case 'checkout':
        attendance.checkout(reason);
        break;
    }
  });
  socket.on('disconnect', function (msg) {
    log(msg);
  });
})();
