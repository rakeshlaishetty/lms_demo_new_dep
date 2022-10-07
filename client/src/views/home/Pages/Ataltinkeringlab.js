/* eslint-disable */

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderOne from '../common/header/HeaderOne';
import { FiCheck } from 'react-icons/fi';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { adminRoot } from 'constants/defaultValues';
import classnames from 'classnames';
import SectionTitle from '../elements/sectionTitle/SectionTitle';
import Separator from '../elements/separator/Separator';
import FooterThree from '../common/footer/FooterThree';

import '../assets/scss/style.css';

import Features from '../elements/features/Features';

const Ataltinkeringlab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const applications = [
    {
      title: 'Admin',
      path: `${adminRoot}/applications/survey`,
      img: '/assets/img/landing-page/applications/survey.jpg',
    },
    {
      title: 'Teacher',
      path: `${adminRoot}/applications/chat`,
      img: '/assets/img/landing-page/applications/chat.jpg',
    },
    {
      title: 'Student',
      path: `${adminRoot}/applications/todo`,
      img: '/assets/img/landing-page/applications/todo.jpg',
    },
  ];
  const AtaltinkeringLab = {
    One: [
      {
        Head: 'Courses',
        Text: [
          'Artificial Intelligence',
          'Augmented & Virtual reality',
          'Blockchain',
          'Data Science',
          'Drones',
          'Python',
          'Robotics',
          'Website & App development',
          '3D printing',
          'Entrepreneurship for kids',
        ],
      },
    ],
    Two: [
      {
        Head: 'Experimental kits',
        Text: [
          'Robotics (optional)',
          'Drone* (optional)',
          'AI simulation kits',
          'MCQ',
          'AR & VR simulation kits',
          'Python simulation kits',
          'Web & App simulation kits',
        ],
      },
    ],
    Three: [
      {
        Head: 'Teacher training & support',
        Text: ['2 years', 'Upskilling for all the courses'],
      },
    ],
    Four: [
      {
        Head: 'Student Innovation Council',
        Text: [
          'Course on Entrepreneurship',
          'Workshop on pitch decks',
          'Incubational guidance',
          'Ideation & funding support',
        ],
      },
    ],
    Five: [
      {
        Head: 'Class-wise study material',
        Text: ['For all courses', 'Interactive & Gamified'],
      },
    ],
    Six: [
      {
        Head: 'Challenges & hackathons',
        Text: ['Experts advice', 'Exposure to national research labs'],
      },
    ],
    Seven: [
      {
        Head: 'Class-wise curriculum',
        Text: ['Weekly class guidance', 'Detailed class-wise curriculum'],
      },
    ],
    Eight: [
      {
        Head: 'On call support',
        Text: ['End-to-end support', 'Expert visit'],
      },
    ],
  };
  return (
    <div className="page-wrapper">
      {/* <HeaderTopNews /> */}
      <HeaderOne
        btnStyle="btn-small round btn-icon"
        HeaderSTyle="header-not-transparent"
      />

      {/* <div className="rn-service-area rn-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="Get Solutions For All Your School Needs"
                  // title="Complete school Solutions"
                  // description="get solutions for all your school needs <br /> School Softwares and Solutions  "
                />
              </div>
            </div>
            <ServiceTwo cardStyle="card-style-1" textAlign="text-start" />
          </div>
        </div> */}

      <Separator />
      <div className="rwt-timeline-area rn-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <SectionTitle
                textAlign="text-center"
                subtitle="One Stop Platform For Schools"
                title="Completely Digitize your School"
                description="with our AI-Based Softwares, customized E-learning application, and Advanced STEM Lab solutions, <br /> All in one software & one platform."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rn-inner-pages ">
        <div className="wrapper plr--150 plr_lg--30 plr_md--30 plr_sm--30">
          <div className="about-area about-style-4 rn-section-gap-50">
            <div className="container">
              <div className="row row--40 align-items-center">
                <div
                  className="col-lg-6 "
                  style={{
                    alignitems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <img
                    src="https://img.icons8.com/plasticine/480/000000/mail-folder.png"
                    width="50%"
                    height="auto"
                    alt="text"
                  />
                </div>
                <div className="col-lg-6 mt_md--40 mt_sm--40 AboutFour__Text__PM">
                  <div className="content ">
                    <div className="inner">
                      <h3 className="theme-gradient">Atal Tinkering Lab</h3>
                      <h5>Solutions</h5>
                      <p>Our Aim</p>
                      <ul className="feature-list">
                        <li>
                          <div className="icon">
                            <FiCheck />
                          </div>
                          <div className="title-wrapper">
                            <h4 className="title">
                              Inculcate the industry skills among students and
                              guide them to monetize it
                            </h4>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Screenshots */}
            <div className="row screenshots rn-section-gap">
              <div className="col-12 text-center mb-4">
                <Nav tabs className="justify-content-center">
                  {applications.map((app, index) => (
                    <NavItem key={`app_nav_${index}`}>
                      <a
                        href="#tab"
                        className={classnames({
                          'nav-link': true,
                          active: activeTab === index,
                        })}
                        onClick={(event) => {
                          event.preventDefault();
                          toggle(index);
                        }}
                      >
                        {app.title}
                      </a>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={activeTab}>
                  {applications.map((app, index) => (
                    <TabPane key={`app_tab_${index}`} tabId={index}>
                      <NavLink to={app.path}>
                        <img
                          alt={app.title}
                          src={app.img}
                          className="app-image"
                        />
                      </NavLink>
                    </TabPane>
                  ))}
                </TabContent>
              </div>
            </div>

            <div className="rwt-brand-area ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle=""
                      title="What we offer for ATL"
                      description=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rn-section-gap">
            <Features
              One={AtaltinkeringLab.One}
              Two={AtaltinkeringLab.Two}
              Three={AtaltinkeringLab.Three}
              Four={AtaltinkeringLab.Four}
              Five={AtaltinkeringLab.Five}
              Six={AtaltinkeringLab.Six}
              Seven={AtaltinkeringLab.Seven}
              Eight={AtaltinkeringLab.Eight}
            />
          </div>

          {/* <div className="container row mt--40 row--15 m-auto justify-content-around">
            <div className="row row--40 align-items-center">
              <div
                className="col-lg-12 "
                style={{
                  alignitems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <Link
                  className="btn-default btn-small btn-border text-center"
                  to="#service"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* End Inner Pages  */}
      <FooterThree />
    </div>
  );
};

export default Ataltinkeringlab;
