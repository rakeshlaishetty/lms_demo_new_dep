/* eslint-disable */
import React from 'react';
// import CountUp from 'react-countup';
// import TrackVisibility from 'react-on-screen';

const Data = [
  {
    countNum: 199,
    countTitle: 'Happy Clients.',
  },
  {
    countNum: 575,
    countTitle: 'Employees',
  },
  {
    countNum: 69,
    countTitle: 'Useful Programs',
  },
  {
    countNum: 500,
    countTitle: 'Useful Programs',
  },
];
const CounterUpFour = ({ textALign, counterStyle, column }) => {
  return (
    <div className="row">
      {Data.map((data, index) => (
        <div className={`${column}`} key={index}>
          <div className={`count-box ${counterStyle} ${textALign}`}>
            {data.countNum}
            <h5 className="counter-title">{data.countTitle}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CounterUpFour;
