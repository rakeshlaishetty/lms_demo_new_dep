import React from 'react';
import sun from '../../assets/images/light-dark-switch/sun-01.svg';
import vector from '../../assets/images/light-dark-switch/vector.svg';

const Darkmode = () => {
  const switchTheme = () => {
    document.querySelector('body').classList.toggle('light');
  };
  return (
    <button id="darkmode" onClick={(e) => switchTheme(e)} type="button">
      <img className="light-icon" src={sun} alt="Sun images" />
      <img className="dark-icon" src={vector} alt="Sun images" />
    </button>
  );
};
export default Darkmode;
