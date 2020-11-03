function start() {
  const cron = require('cron'),
    log = console.log,
    attendance = require('./attendance'),
    minutes = [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      //30,
    ],
    randomMinutes = () => minutes[Math.floor(Math.random() * minutes.length)],
    cronTimeCheckout = `00 ${randomMinutes()} 09 * * 0-6`;
  log('> cronTimeCheckout: %s', cronTimeCheckout);
  const jobCheckout = new cron.CronJob({
    cronTime: cronTimeCheckout,
    onTick: function () {
      log('> checkout runing...');
      attendance.checkout();
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  jobCheckout.start();
}
const serviceName = 'Checkout Auto Service',
  log = console.log;
process.on('message', async (message) => {
  log('> %s got message: %s', serviceName, message);
  if (message === 'start') {
    start();
    process.send('Checkout Service started');
  }
});
