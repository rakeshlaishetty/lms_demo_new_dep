/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import QWINGS from '../../../../assets/logos/QWINGS.png';
import black from '../../../../assets/logos/black.svg';
import white from '../../../../assets/logos/white.svg';
const Logo = ({ image, image2 }) => {
  let title = 'QWINGS';
  return (
    <div className="logo">
      <Link to={process.env.PUBLIC_URL + '/'}>
        <img className="logo-light" src={QWINGS} alt="Corporate Logo" />
        <img className="logo-dark" src={QWINGS} alt="Corporate Logo" />
        <p className="title" dangerouslySetInnerHTML={{ __html: title }}></p>
      </Link>
    </div>
  );
};
Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
