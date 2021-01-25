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
    mapper: (m) => parseInt((m / 100) * 10, 10) / 100,
  },
  'Duration (min)': {
    key: 'duration',
    mapper: (sec) => parseInt((sec / 60) * 10, 10) / 10,
  },
  'Avg Pace (mkm)': {
    key: 'averageSpeed',
    mapper: (mps) => {
      const mkm = 1 / ((mps / 1000) * 60);
      const sec = String((mkm % 1) * 60).split('.')[0];
      return `${parseInt(mkm, 10)}.${sec.length === 1 ? `0${sec}` : sec}`;
    },
    isGood: (value) => {
      let [min, sec] = value.split('.');
      min = parseInt(min, 10);
      sec = parseInt(sec, 10);
      return (min + (sec / 100)) <= 5;
    },
    isBad: (value) => {
      let [min, sec] = value.split('.');
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
