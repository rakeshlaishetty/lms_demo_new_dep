/* eslint-disable */
import React from 'react';
// import VideoTwo from '../video/VideoTwo';
import { FiCheck } from 'react-icons/fi';

const PopupData = [
  {
    id: '01',
    image: './images/bg/bg-image-4.jpg',
    popupLink: [
      'https://www.youtube.com/watch?v=ctsT5Y-InqE&ab_channel=Rainbow-Themes',
    ],
  },
];

const AboutReverse = ({ data }) => {
  return (
    <div className="about-area about-style-4 rn-section-gap">
      <div className="container">
        <div className="row row--40 align-items-center">
          <div className="col-lg-6 mt_md--40 mt_sm--40 ">
            <div className="content">
              <div className="inner">
                <h3 className="">{data.HeadText}</h3>
                <ul className="feature-list">
                  <li>
                    <div className="icon">
                      <FiCheck />
                    </div>
                    <div className="title-wrapper">
                      <h4 className="title">{data.listText1}</h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <FiCheck />
                    </div>
                    <div className="title-wrapper">
                      <h4 className="title">{data.listText2}</h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <FiCheck />
                    </div>
                    <div className="title-wrapper">
                      <h4 className="title">{data.listText3}</h4>
                    </div>
                  </li>
                </ul>
                <div className="about-btn mt--30">
                  <a className="btn-default" href={data.link}>
                    {data.button}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 AboutFour__Text__PM">
           
              <img src={data.image} width="100%" height="50%" alt="text" />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutReverse;
