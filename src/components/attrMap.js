const { decimalToTimeStr } = require('pretty-time-decimal');

const AttrMap = {
  'Time Of Day': {
    key: 'startTimeLocal',
    mapper: (t) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(t);
      const day = days[date.getDay()];
      const hour = date.getHours();
      const partsOfDay = [[12, 'morning'], [15, 'noon'], [18, 'afternoon'], [20, 'evening'], [5, 'night']];
      const partOfDay = partsOfDay.find(([limit]) => hour <= limit)[1];
      return `${day} ${partOfDay}`;
    },
  },
  'Start Time': {
    key: 'startTimeLocal',
  },
  'Distance (km)': {
    key: 'distance',
    mapper: (m) => {
      let km = parseInt((m / 100) * 100, 10) / 1000;
      km = String(km);
      // pad right zeros
      km = km.replace(/(\d+\.\d$)/, '$100').replace(/(\d+\.\d\d$)/, '$10');
      return km;
    },
  },
  'Duration (min)': {
    key: 'duration',
    mapper: (seconds) => {
      const minuntes = parseInt(seconds / 60, 10);
      const sec = Math.floor(seconds % 60);
      return `${minuntes}:${sec}`;
    },
  },
  'Avg Pace (mkm)': {
    key: 'averageSpeed',
    mapper: (mps) => {
      const mkm = 1 / ((mps / 1000) * 60);
      return decimalToTimeStr(mkm);
    },
    isGood: (value) => {
      let [min, sec] = value.split(':');
      min = parseInt(min, 10);
      sec = parseInt(sec, 10);
      return (min + (sec / 100)) <= 5;
    },
    isBad: (value) => {
      let [min, sec] = value.split(':');
      min = parseInt(min, 10);
      sec = parseInt(sec, 10);
      return (min + (sec / 100)) >= 5.15;
    },
  },
  'Avg Cadance (spm)': {
    key: 'averageRunningCadenceInStepsPerMinute',
    mapper: Math.round,
    isGood: (value) => value >= 175 && value <= 185,
    isBad: (value) => value <= 169,
  },
  Calories: {
    key: 'calories',
  },
};

module.exports = AttrMap;
