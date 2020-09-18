const fetch = require('node-fetch'),
  cfg = require('./aio.cfg'),
  log = console.log;

/**
 *
 * @param {*} type is ['checkin','checkout']
 */
async function sendAttendance(type) {
  let url = 'https://atacore.azurewebsites.net/api/attendance/' + type,
    options = {
      method: 'post',
      body: JSON.stringify({
        checkInTime: '2000-01-01T00:00:00+00:00',
        checkOutTime: '2000-01-01T00:00:00+00:00',
        isCheckIn: type === 'checkin' ? true : false,
        reason: '',
      }),
      headers: {
        Authorization: cfg.tokenUser,
        'Content-Type': 'application/json',
      },
    },
    response = await fetch(url, options);
  log(`${response.url}: ${response.status}(${response.statusText})`);
  return await response.text();
}
async function checkin() {
  return await sendAttendance('checkin');
}
async function checkout() {
  return await sendAttendance('checkout');
}
module.exports = { checkin, checkout };
