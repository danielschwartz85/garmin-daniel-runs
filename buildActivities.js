/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

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

  console.log('writing activities');
  pWriteFile('./activities.js', `window.activities = ${activities}; window.updated_at=${Date.now()};`);

  console.log('build successfull', process.env.GITHUB_TOKEN);
}());
