/* eslint-disable no-console */

require('dotenv').config();
const garminRunFetch = require('garmin-run-fetch');
const fs = require('fs');
const util = require('util');
const { exit } = require('process');

const opts = {
  userName: process.env.GARMIN_USER_NAME,
  password: process.env.GARMIN_PASSWORD,
  // limit,
  // startDate,
  // endDate,
};

const pWriteFile = util.promisify(fs.writeFile);
const pResult = (promise) => promise.then((r) => [undefined, r]).catch((e) => [e]);

(async function buildActivities() {
  console.log('getting activities');
  const [err, activitiesJson] = await pResult(garminRunFetch(opts));
  const activities = !err && JSON.stringify(activitiesJson);
  if (err) {
    console.error('Failed to fetch data', err);
    exit(1);
  }

  console.log('updating activities');
  pWriteFile(`${__dirname}/../data/activities.json`, activities);

  console.log('updating meta');
  const meta = JSON.stringify({ updatedAt: Date.now() });
  pWriteFile(`${__dirname}/../data/meta.json`, meta);

  console.log('fetch successfull');
}());
