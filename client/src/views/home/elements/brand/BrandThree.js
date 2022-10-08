/* eslint-disable */
import React from 'react';

const BrandList = [
  {
    image: 'https://www.bannerbear.com/images/cert_amazon.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_zapier.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_amazon.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_zapier.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_amazon.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_zapier.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_amazon.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_zapier.png',
  },
  {
    image: 'https://www.bannerbear.com/images/cert_amazon.png',
  },
];

const BrandThree = ({ brandStyle }) => {
  return (
    <ul className={`brand-list ${brandStyle}`}>
      {BrandList.map((data, index) => (
        <li key={index}>
          <a href="#">
            <img src={`${data.image}`} alt="Brand Image" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BrandThree;
