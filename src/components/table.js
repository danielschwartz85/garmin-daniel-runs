import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AttrMap from './attrMap';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    width: '100%',
  },
  container: {
    maxHeight: '90vh',
  },
});

export default function BasicTable({ activities }) {
  const classes = useStyles();
  const uiKeys = Object.keys(AttrMap);
  const rowKey = AttrMap[uiKeys[1]].key;

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
            {activities.map((row) => (
              <TableRow key={row[rowKey]}>
                {uiKeys.map((uiKey) => {
                  const { key } = AttrMap[uiKey];
                  const { mapper } = AttrMap[uiKey];
                  const mappedValue = mapper ? mapper(row[key]) : row[key];
                  const style = {};
                  if (AttrMap[uiKey].isGood && AttrMap[uiKey].isGood(mappedValue)) {
                    style.color = 'green';
                  } else if (AttrMap[uiKey].isBad && AttrMap[uiKey].isBad(mappedValue)) {
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

BasicTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activities: PropTypes.array.isRequired,
};
