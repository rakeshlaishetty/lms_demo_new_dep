/* eslint-disable */
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import ScrollAnimation from 'react-animate-on-scroll';

const Features = ({ One, Two, Three, Four, Five, Six, Seven, Eight }) => {
  return (
    <>
      <div className="row mt--40 row--15 m-auto justify-content-around">
        <div className="col-lg-5 mt_md--30 mt_sm--30 ">
          {One?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>

        <div className="col-lg-5 mt_md--30 mt_sm--30">
          {Two?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="row mt--40 row--15 m-auto justify-content-around">
        <div className="col-lg-5 mt_md--30 mt_sm--30 ">
          {Three?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>

        <div className="col-lg-5 mt_md--30 mt_sm--30">
          {Four?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="row mt--40 row--15 m-auto justify-content-around">
        <div className="col-lg-5 mt_md--30 mt_sm--30 ">
          {Five?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>

        <div className="col-lg-5 mt_md--30 mt_sm--30">
          {Six?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="row mt--40 row--15 m-auto justify-content-around">
        <div className="col-lg-5 mt_md--30 mt_sm--30 ">
          {Seven?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>

        <div className="col-lg-5 mt_md--30 mt_sm--30">
          {Eight?.map((text) => {
            return (
              <>
                <div className="content about-style-4">
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}
                  >
                    <div className="">
                      <h4 className="theme-gradient">{text.Head}</h4>
                      <ul className="feature-list">
                        {text.Text.map((datas) => {
                          return (
                            <>
                              <li>
                                <div className="icon">
                                  <FiCheck />
                                </div>
                                <div className="title-wrapper">
                                  <p className="title">{datas}</p>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </ScrollAnimation>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Features;
