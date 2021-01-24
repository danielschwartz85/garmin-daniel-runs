import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStaticQuery, graphql } from 'gatsby';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    width: '100%',
  },
  container: {
    maxHeight: '90vh',
  },
});

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

export default function BasicTable() {
  const classes = useStyles();

  const data = useStaticQuery(
    graphql`
      query {
        allActivitiesJson {
          edges {
            node {
              startTimeLocal,
              distance,
              duration,
              averageSpeed,
              averageRunningCadenceInStepsPerMinute,
              calories
            }
          }
        },
      }
    `,
  );

  const uiKeys = Object.keys(attrMap);
  const rows = data.allActivitiesJson.edges.map((a) => a.node);
  const rowKey = attrMap[uiKeys[1]].key;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {uiKeys.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[rowKey]}>
                {uiKeys.map((uiKey) => {
                  const { key } = attrMap[uiKey];
                  const { mapper } = attrMap[uiKey];
                  const mappedValue = mapper ? mapper(row[key]) : row[key];
                  const style = {};
                  if (attrMap[uiKey].isGood && attrMap[uiKey].isGood(mappedValue)) {
                    style.color = 'green';
                  } else if (attrMap[uiKey].isBad && attrMap[uiKey].isBad(mappedValue)) {
                    style.color = 'red';
                  }
                  return (<TableCell key={uiKey} style={style}>{mappedValue}</TableCell>);
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
