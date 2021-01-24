/* eslint-disable no-console */

require('dotenv').config();
const garminRunFetch = require('garmin-run-fetch');
const fs = require('fs');
const util = require('util');

const pWriteFile = util.promisify(fs.writeFile);

const opts = {
  userName: process.env.GARMIN_USER_NAME,
  password: process.env.GARMIN_PASSWORD,
  // limit,
  // startDate,
  // endDate,
};

(async function buildActivities() {
  console.log('getting activities');
  const activitiesJson = await garminRunFetch(opts);
  const activities = JSON.stringify(activitiesJson);

  console.log('updating activities');
  pWriteFile(`${__dirname}/../data/activities.json`, activities);

  console.log('updating meta');
  const meta = JSON.stringify({ updatedAt: Date.now() });
  pWriteFile(`${__dirname}/../data/meta.json`, meta);

  console.log('fetch successfull');
}());
