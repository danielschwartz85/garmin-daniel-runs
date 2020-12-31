/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

const attrMap = {
  startTimeLocal: {
    name: 'Start Time',
  },
  duration: {
    name: 'Duration (min)',
    mapper: (sec) => Math.round((sec / 60) * 10) / 10,
  },
  distance: {
    name: 'Distance (m)',
    mapper: (m) => Math.round(m).toLocaleString(),
  },
  averageSpeed: {
    name: 'Avg Pace (mkm)',
    mapper: (mps) => Math.round(100 / ((mps / 1000) * 60)) / 100,
  },
  averageRunningCadenceInStepsPerMinute: {
    name: 'Avg Cadance (spm)',
    mapper: Math.round,
  },
  calories: {
    name: 'Calories',
  },
};

function cellNameToAttrName(name) {
  return name.replace(/[ ()\/]/g, '-');
}

class TableRow extends HTMLElement {
  connectedCallback() {
    this.className = 'row';
    const cellNames = Object.values(attrMap).map((a) => a.name);
    for (const elem of cellNames) {
      this._appendCell(elem);
    }
  }

  _appendCell(cellName) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const att = document.createAttribute('data-title');
    att.value = cellName;
    cell.setAttributeNode(att);

    const attrName = cellNameToAttrName(cellName);
    cell.innerHTML = this.getAttribute(attrName);
    this.appendChild(cell);
  }
}
window.customElements.define('table-row', TableRow);

function addRow(activity) {
  const row = document.createElement('table-row');
  for (const [key, { name, mapper }] of Object.entries(attrMap)) {
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

window.onload = populateTable();
