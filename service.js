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
  log(await response.text());
}
async function checkin() {
  let url = 'https://atacore.azurewebsites.net/api/attendance/checkin',
    options = {
      method: 'post',
      body: JSON.stringify({
        checkInTime: '2000-01-01T00:00:00+00:00',
        checkOutTime: '2000-01-01T00:00:00+00:00',
        isCheckIn: true,
        reason: '',
      }),
      headers: {
        Authorization: cfg.tokenUser,
        'Content-Type': 'application/json',
      },
    },
    response = await fetch(url, options);
  log(`${response.url}: ${response.status}(${response.statusText})`);
  log(await response.text());
}
async function checkout() {
  let url = 'https://atacore.azurewebsites.net/api/attendance/checkout',
    options = {
      method: 'post',
      body: JSON.stringify({
        checkInTime: '2000-01-01T00:00:00+00:00',
        checkOutTime: '2000-01-01T00:00:00+00:00',
        isCheckIn: false,
        reason: '',
      }),
      headers: {
        Authorization: cfg.tokenUser,
        'Content-Type': 'application/json',
      },
    },
    response = await fetch(url, options);
  log(`${response.url}: ${response.status}(${response.statusText})`);
  log(await response.text());
}
//checkin();
//checkout();
sendAttendance('checkout')
