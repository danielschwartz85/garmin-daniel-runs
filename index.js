/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

/*
 * TODO
 *
 * 1. take headers names from the same plaec
 *    ( now index.html holds the table column names and
 *    this holds the responsive column names )
 *
 * 2. set run type to garmin-run-fetch (and rename) then set as 'running'
 *    in buildActivities.js.
 * 3. enrich table
 *
 */

const attrMap = {
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

function cellNameToAttrName(name) {
  return name.replace(/[ ()/]/g, '-');
}

class TableRow extends HTMLElement {
  connectedCallback() {
    this.className = 'row';
    for (const elem of Object.keys(attrMap)) {
      this._appendCell(elem);
    }
  }

  _appendCell(cellName) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    const att = document.createAttribute('data-title');
    att.value = cellName;
    cell.setAttributeNode(att);

    const attrName = cellNameToAttrName(cellName);
    const data = this.getAttribute(attrName);
    const isGood = attrMap[cellName].isGood ? attrMap[cellName].isGood(data) : false;
    if (isGood) {
      cell.classList.add('good');
    }
    const isBad = attrMap[cellName].isBad ? attrMap[cellName].isBad(data) : false;
    if (isBad) {
      cell.classList.add('bad');
    }
    cell.innerHTML = data;
    this.appendChild(cell);
  }
}
window.customElements.define('table-row', TableRow);

function addRow(activity) {
  const row = document.createElement('table-row');
  for (const [name, { key, mapper }] of Object.entries(attrMap)) {
    const value = mapper ? mapper(activity[key]) : activity[key];
    const attrName = cellNameToAttrName(name);
    row.setAttribute(attrName, value);
  }
  const table = document.querySelector('.table');
  table.appendChild(row);
}

function populateTable() {
  for (const activity of window.activities) {
    addRow(activity);
  }
}

window.onload = () => {
  populateTable();
  const updatedAtStr = `Updated at ${new Date(window.updated_at).toLocaleString()}`;
  document.querySelector('.updated-at').innerHTML = updatedAtStr;
};
