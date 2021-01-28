import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot, LineSeries,
  HorizontalGridLines, VerticalGridLines,
  YAxis, DiscreteColorLegend,
  makeWidthFlexible,
} from 'react-vis';
import PropTypes from 'prop-types';
import AttrMap from './attrMap';

const mappers = Object.values(AttrMap);
const cadanceMapper = mappers.find(({ key }) => key === 'averageRunningCadenceInStepsPerMinute');
const paceMapper = mappers.find(({ key }) => key === 'averageSpeed');

function Chart({ activities }) {
  const { length } = activities;
  const cadanceData = activities.map(({ averageRunningCadenceInStepsPerMinute }, i) => {
    const y = cadanceMapper.mapper(averageRunningCadenceInStepsPerMinute);
    return { x: length - i, y };
  });
  const paceData = activities.map(({ averageSpeed }, i) => {
    const y = paceMapper.mapper(averageSpeed).replace(':', '.');
    return { x: length - i, y: Number(y) };
  });

  //   const paceToCadanceScale = ({ y }) => ((y - 4) * 7.5) + 170;
  const cadanceToPaceScale = ({ y }) => ((y - 170) / 7.5) + 4;
  const FXPlot = makeWidthFlexible(XYPlot);

  return (
    <div className="chartComtainer" style={{ marginTop: '10px' }}>
      <FXPlot height={200} yDomain={[4, 6]}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <YAxis />
        <DiscreteColorLegend
          style={{ position: 'absolute', left: '50px', top: '10px' }}
          orientation="horizontal"
          items={[
            {
              title: 'Pace',
              color: 'orange',
            },
            {
              title: 'Cadance',
              color: 'green',
            },
          ]}
        />
        <LineSeries data={paceData} color="orange" />
        <LineSeries data={cadanceData} color="green" getY={cadanceToPaceScale} />
      </FXPlot>
    </div>
  );
}

Chart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activities: PropTypes.array.isRequired,
};

export default Chart;
