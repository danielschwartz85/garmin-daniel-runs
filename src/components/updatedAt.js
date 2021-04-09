import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.subtitle1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: '10px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export default function UpdatedAt() {
  const classes = useStyles();

  const data = useStaticQuery(
    graphql`
    query MyQuery {
        dataJson {
          updatedAt
        } 
      }
    `,
  );

  const epoch = data.dataJson.updatedAt;
  const updatedAt = moment(new Date(epoch)).fromNow();
  return <div className={classes.root}>{`Updated ${updatedAt}`}</div>;
}
