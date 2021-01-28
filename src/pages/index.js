/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Table from '../components/table';
import UpdatedAt from '../components/updatedAt';
import Chart from '../components/chart';

export default function MyRuns({ data: { allActivitiesJson } }) {
  const activities = allActivitiesJson.edges.map(({ node }) => node);
  return (
    <div>
      <SEO />
      <Table activities={activities} />
      <Chart activities={activities} />
      <UpdatedAt />
    </div>
  );
}

MyRuns.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
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
`;
