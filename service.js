const cron = require('cron'),
  log = console.log,
  attendance = require('./attendance'),
  minutes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  randomMinutes = () => minutes[Math.floor(Math.random() * 31)];


const jobCheckin = new cron.CronJob({
  cronTime: `00 ${randomMinutes()} 09 * * 0-6`,
  onTick: function () {
    log('checkin runing...');
    attendance.checkin();
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh',
});
jobCheckin.start();

const jobCheckout = new cron.CronJob({
  cronTime: `00 ${randomMinutes()} 18 * * 0-6`,
  onTick: function () {
    log('checkout runing...');
    attendance.checkout();
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh',
});
jobCheckout.start();
