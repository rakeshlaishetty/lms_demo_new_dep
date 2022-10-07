/* eslint-disable */

import React from 'react';
import { FiCheck } from 'react-icons/fi';
import ScrollAnimation from 'react-animate-on-scroll';

const NewTimeline = ({ TimelineData }) => {
  return (
    <div className="rn-timeline-wrapper timeline-style-one position-relative">
      <div className="timeline-line"></div>
      {TimelineData.map((data) => {
        return (
          <>
            <div className="single-timeline mt--50" key={data}>
              <div className="timeline-dot">
                <div className="time-line-circle"></div>
              </div>
              <div className="single-content">
                <div className="inner">
                  <div className="row row--30 align-items-center">
                    <div className="order-2 order-lg-1 col-lg-6 mt_md--40 mt_sm--40">
                      <div className="content about-style-4">
                        <ScrollAnimation
                          animateIn="fadeInUp"
                          animateOut="fadeInOut"
                          animateOnce={true}
                        >
                          <div className="">
                            <h3 className="">{data.Head}</h3>
                            <ul className="feature-list">
                              {data.Text.map((textdata) => {
                                return (
                                  <>
                                    <li>
                                      <div className="icon">
                                        <FiCheck />
                                      </div>
                                      <div className="title-wrapper">
                                        <p className="title">{textdata}</p>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>

                            <br />
                          </div>
                        </ScrollAnimation>
                      </div>
                    </div>
                    <div className="order-1 order-lg-2 col-lg-6">
                      <div className="thumbnail">
                        <img
                          className="w-100"
                          src={`${data.img}`}
                          alt="Corporate React Template"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default NewTimeline;
