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
    const [min, sec] = paceMapper.mapper(averageSpeed).split(':').map(Number);
    return { x: length - i, y: min + (sec / 60) };
  });

  const onNearestX = (value, { index }) => {
    let pace = paceData[index].y;
    pace = parseInt(pace, 10) + ((pace % 1) * 0.6);
    pace = String(pace).substring(0, 4);
    setTooltipValue({ pace, cadance: cadanceData[index].y, value });
  };
  const onMouseLeave = () => {
    setTooltipValue({});
  };

  //   const paceToCadanceScale = ({ y }) => ((y - 4) * 7.5) + 170;
  const cadanceToPaceScale = ({ y }) => ((y - 170) / 7.5) + 4;
  const FXPlot = makeWidthFlexible(XYPlot);

  return (
    <div className="chartComtainer" style={{ marginTop: '10px' }} onMouseLeave={onMouseLeave}>
      <FXPlot height={200} yDomain={[4, 6]}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <YAxis tickFormat={(v) => (
          {
            4: '4:00', 4.5: '4:30', 5: '5:00', 5.5: '5:30', 6: '6:00',
          }[v]
        )}
        />
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
