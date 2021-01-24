import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.subtitle1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: '10px',
    color: 'darkcyan',
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
  const updatedAt = new Date(epoch).toLocaleString();
  return <div className={classes.root}>{`Updated at ${updatedAt}`}</div>;
}
