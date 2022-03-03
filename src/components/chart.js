import React, { useState } from 'react';
import '../../node_modules/react-vis/dist/style.css';

import {
  XYPlot, LineSeries,
  HorizontalGridLines, VerticalGridLines,
  YAxis, DiscreteColorLegend,
  makeWidthFlexible,
  Crosshair,
} from 'react-vis';
import PropTypes from 'prop-types';
import AttrMap from './attrMap';

const { timeStrToDecimal, decimalToTimeStr } = require('pretty-time-decimal');

const MIN_PACE = 3;
const MAX_PACE = 8;

const mappers = Object.values(AttrMap);
const cadanceMapper = mappers.find(({ key }) => key === 'averageRunningCadenceInStepsPerMinute');
const paceMapper = mappers.find(({ key }) => key === 'averageSpeed');

function Chart({ activities }) {
  const [tooltipValue, setTooltipValue] = useState(0);

  const { length } = activities;
  const cadanceData = activities.map(({ averageRunningCadenceInStepsPerMinute }, i) => {
    const y = cadanceMapper.mapper(averageRunningCadenceInStepsPerMinute);
    return { x: length - i, y };
  });
  const paceData = activities.map(({ averageSpeed }, i) => {
    const pace = paceMapper.mapper(averageSpeed);
    const y = timeStrToDecimal(pace);
    return { x: length - i, y };
  });

  const onNearestX = (value, { index }) => {
    const pace = decimalToTimeStr(paceData[index].y);
    setTooltipValue({ pace, cadance: cadanceData[index].y, value });
  };
  const onMouseLeave = () => {
    setTooltipValue({});
  };

  //   const paceToCadanceScale = ({ y }) => ((y - 4) * 7.5) + 170;
  const cadanceToPaceScale = ({ y }) => ((y - 170) / 7.5) + MIN_PACE + 2;
  const FXPlot = makeWidthFlexible(XYPlot);

  return (
    <div className="chartComtainer" style={{ marginTop: '10px' }} onMouseLeave={onMouseLeave}>
      <FXPlot height={200} yDomain={[MIN_PACE, MAX_PACE]}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <YAxis tickFormat={decimalToTimeStr} />
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
        <LineSeries data={paceData} color="orange" onNearestX={onNearestX} />
        <LineSeries data={cadanceData} color="green" getY={cadanceToPaceScale} />
        <Crosshair className="test-class-name" values={[tooltipValue.value]}>
          <div style={{
            background: 'white',
            borderStyle: 'solid',
            borderWidth: '1px',
            textAlign: 'center',
            width: '120%',
          }}
          >
            <p style={{ color: 'green' }}>
              Cadance:
              {tooltipValue.cadance}
            </p>
            <p style={{ color: 'orange' }}>
              Pace:
              {tooltipValue.pace}
            </p>
          </div>
        </Crosshair>
      </FXPlot>
    </div>
  );
}

Chart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activities: PropTypes.array.isRequired,
};

export default Chart;
