/* eslint-disable */
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { adminRoot } from 'constants/defaultValues';
import classnames from 'classnames';
import { FiCheck } from 'react-icons/fi';
import AboutReverse from '../elements/about/AboutReverse';
import SectionTitle from '../elements/sectionTitle/SectionTitle';
import AboutFour from '../elements/about/AboutFour';
import Separator from '../elements/separator/Separator';
import HeaderOne from '../common/header/HeaderOne';
import FooterThree from '../common/footer/FooterThree';
import ServiceTwo from '../elements/service/ServiceTwo';
import NewTimeline from '../elements/timeline/NewTimeline';
import TimelineOne from '../elements/timeline/TimelineOne';
import TestimonialThree from '../elements/testimonial/TestimonialThree';
import CounterUpFour from '../elements/counterup/CounterUpFour';
import SEO from '../common/SEO';

import '../assets/scss/style.css';
import BrandCarousel from '../elements/BrandCarousel/BrandCarousel';
import BrandThree from '../elements/brand/BrandThree';
import SliderSlick from '../elements/react-slick/SliderSlick';
import Features from '../elements/features/Features';
// import AboutUsnew from '../elements/about/AboutUsnew';

const InnerPages = [
  {
    id: '1',
    Url: '/blog-grid',
    Image: 'https://picsum.photos/seed/picsum/200/300',
    Imagelight: './images/demo/blog-grid-light.png',
    Title: 'Blog Grid',
  },
  {
    id: '2',
    Url: '/blog-grid-sidebar',
    Image: 'https://picsum.photos/seed/picsum/200/300',
    Imagelight: './images/demo/blog-grid-sidebar-light.png',
    Title: 'Blog Grid Sidebar',
  },
  {
    id: '3',
    Url: '/blog-list-view',
    Image: 'https://picsum.photos/seed/picsum/200/300',
    Imagelight: './images/demo/blog-list-view-light.png',
    Title: 'Blog List View',
  },
];

const SplitSideText = {
  HeadText: `School Management Software.`,
  listText1: 'Digitize school Admin, Teacher, and Students tasks',
  listText2: 'AI based monitoring and assessment',
  listText3: 'All in one software & one platform',
  image: 'https://picsum.photos/680/561',
  button: 'Learn More',
  link: '/app/login-as',
};

const SplitSideTextSecond = {
  HeadText: `Self Study Platform`,
  listText1: 'Gamified syllabus and STEM courses for school',
  listText2: 'Students personal dashboard',
  listText3: 'AI based performance monitoring',
  image: 'https://picsum.photos/680/561',
  button: 'Learn More',
  link: 'www.qwings.org',
};

const SplitSideTextReverseOne = {
  HeadText: `ATL/STEM Lab Solutions.`,
  listText1: 'AI, Robotics, Drone, & Coding Lab for School',
  listText2: 'Lab setup, Robotics kits, Teacher training, Study materials',
  listText3: 'End-to-end support, all at one place',
  image: 'https://picsum.photos/680/561',
  button: 'Learn More',
  link: '/',
};

const SplitSideTextSecondReverse = {
  HeadText: `Personalized learning platform`,
  listText1: 'On demand training courses',
  listText2: '1-to-1 training',
  listText3: 'Personal Mentors',
  image: 'https://picsum.photos/680/561',
  button: 'Learn More',
  link: '/',
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

const TimelineData = [
  {
    Head: 'Admin',
    Text: [
      'manage fees payment Reminder',
      'manage Students and Staff',
      'manage Admissions',
      'manage attendence',
    ],
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
  {
    Head: 'Teacher',
    Text: [
      'Automated assignments',
      'Automatic asssesment',
      'class setup',
      'Content Creation and Share',
    ],
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
  {
    Head: 'Student',
    Text: [
      'Student dashboard',
      'Student Homework assistant',
      'Student Learning management',
      'Immersive Learning ',
    ],
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
];

const ApplicationSecond = [
  {
    title: 'Lab',
    path: `${adminRoot}/applications/survey`,
    img: '/assets/img/landing-page/applications/survey.jpg',
  },
  {
    title: 'Subjects',
    path: `${adminRoot}/applications/chat`,
    img: '/assets/img/landing-page/applications/chat.jpg',
  },
  {
    title: 'Projects',
    path: `${adminRoot}/applications/todo`,
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
];

const TimelineDataSecond = [
  {
    Head: 'Timeline Features',
    Text: [
      'Lab Setup',
      'Robotics kit',
      'Ai,Drones,Coding,DataScience,simulation kits',
    ],
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
  {
    Head: 'Teacher Training',
    Text: [
      'Classwise curriculumn',
      'Classwise study material',
      'End-to-End Operational Support',
    ],
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

const SchoolManagement = {
  One: [
    {
      Head: 'Admin',
      Text: [
        'Admission management',
        'Fee management',
        'Attendance management',
        'Staff management',
        'Class management',
        'Performance management',
        'Automated reminders',
        'Announcement & Feedback',
      ],
    },
  ],
  Two: [
    {
      Head: 'Content database',
      Text: [
        'Preloaded chapter-wise database',
        'Teacher can assign homework either directly from existing database of they can add questions manually',
        'Automatically gamified homework MCQ, Drag & Drop, Fill in the blank based games',
      ],
    },
  ],
  Three: [
    {
      Head: 'Teacher',
      Text: [
        'Homework automation',
        'Question paper automation',
        'Attendance automation',
        'Lesson plan & content management',
      ],
    },
  ],
  Four: [
    {
      Head: 'Features',
      Text: [
        'Fee reminder automation',
        'SMS notification on homework & progress to parents',
        'AI-based performance tracking',
        'AI-based homework assitant',
      ],
    },
  ],
  Five: [
    {
      Head: 'Students',
      Text: [
        'AI-based homework assistance',
        'Gamified homework',
        'Teacher feedback control',
        'Performance tracking',
        'Access to self-study portal',
      ],
    },
  ],
  Six: [
    {
      Head: 'Devices',
      Text: ['Supports all devices'],
    },
  ],
  Seven: [
    {
      Head: 'Customization',
      Text: ['School specific'],
    },
  ],
};
const ELearningApp = {
  One: [
    {
      Head: 'Gamified NCERT',
      Text: [
        'Math 6 -10th grade',
        'Science 6- 10th grade',
        'Learn, Practice, & Test',
        'AI-based monitoring',
      ],
    },
  ],

  Two: [
    {
      Head: 'Content',
      Text: [
        'Milestone based learning',
        'AI based tracking & tests',
        'Bite-size instructions',
        'MCQ',
        'Drag & Drop',
        'Fill in the blank based practice',
      ],
    },
  ],

  Three: [
    {
      Head: 'Gamified Test-prep segment',
      Text: ['IIT-JEE preparation', 'Level-wise test', 'know your AIR'],
    },
  ],
  Four: [
    {
      Head: 'Features',
      Text: [
        'AI-based performance monitoring',
        'Similar problems',
        'Mark as doubt',
        'Create, share,and play',
      ],
    },
  ],
  Five: [
    {
      Head: 'Gamified STEM courses',
      Text: ['Web Development', 'Python', 'Data Science', 'Drones', 'Robotics'],
    },
  ],
  Six: [
    {
      Head: 'Devices',
      Text: ['Supports all devices'],
    },
  ],
  Seven: [
    {
      Head: 'Customization',
      Text: ['School specific'],
    },
  ],

  Eight: [
    {
      Head: 'IQ tests',
      Text: ['IQ tests for 6-18 year age'],
    },
  ],
};
const Splash = () => {
  const [activeTab, setActiveTab] = useState(0);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <SEO title="Doob" />
      <div className="page-wrapper">
        {/* <HeaderTopNews /> */}
        <HeaderOne
          btnStyle="btn-small round btn-icon"
          HeaderSTyle="header-not-transparent"
        />

        <div className="rn-service-area rn-section-gap">
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
        </div>

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

        {/* Split Sections  */}
        {/* <AboutFour data={SplitSideText} />
        <AboutReverse data={SplitSideTextSecond} />
        <AboutFour data={SplitSideTextReverseOne} />
        <AboutReverse data={SplitSideTextSecondReverse} /> */}

        {/* <Separator /> */}

        {/* Start Inner Pages  */}
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

            <div className="container row mt--40 row--15 m-auto justify-content-around rn-section-gap">
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
                    to="/ataltinkeringlab"
                  >
                    Learn More About ATL Solutions
                  </Link>
                </div>
              </div>
            </div>

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
                      src="https://img.icons8.com/color/480/000000/rocket--v2.png"
                      width="50%"
                      height="auto"
                      alt="text"
                    />
                  </div>
                  <div className="col-lg-6 mt_md--40 mt_sm--40 AboutFour__Text__PM">
                    <div className="content ">
                      <div className="inner">
                        <h3 className="theme-gradient">E- Learning App</h3>
                        <h5>Application</h5>
                        <p>Our Aim</p>
                        <ul className="feature-list">
                          <li>
                            <div className="icon">
                              <FiCheck />
                            </div>
                            <div className="title-wrapper">
                              <h4 className="title">
                                This platform helps students with self Learn,
                                Practice, & Test at their own pace
                              </h4>
                            </div>
                          </li>
                        </ul>
                      </div>
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
                            title="Features & Contents of E-Learning App"
                            description=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Features
                  One={ELearningApp.One}
                  Two={ELearningApp.Two}
                  Three={ELearningApp.Three}
                  Four={ELearningApp.Four}
                  Five={ELearningApp.Five}
                  Six={ELearningApp.Six}
                  Seven={ELearningApp.Seven}
                  Eight={ELearningApp.Eight}
                />

                <div className="container row mt--40 row--15 m-auto justify-content-around rn-section-gap">
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
                        to="/elearning"
                      >
                        Learn More About ELearning
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      src="https://img.icons8.com/color/480/000000/rocket--v2.png"
                      width="50%"
                      height="auto"
                      alt="text"
                    />
                  </div>
                  <div className="col-lg-6 mt_md--40 mt_sm--40 AboutFour__Text__PM">
                    <div className="content ">
                      <div className="inner">
                        <h3 className="theme-gradient">School Management</h3>
                        <h5>Software</h5>
                        <p>Our Aim</p>
                        <ul className="feature-list">
                          <li>
                            <div className="icon">
                              <FiCheck />
                            </div>
                            <div className="title-wrapper">
                              <h4 className="title">
                                TComplete digitization of school is not just the
                                automation of admin and teacher tasks but also
                                providing an AI-based assistant to students
                                during home work
                              </h4>
                            </div>
                          </li>
                        </ul>
                      </div>
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
                            title="All in one for School Admin, Teacher, & Students"
                            description=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Features
                  One={SchoolManagement.One}
                  Two={SchoolManagement.Two}
                  Three={SchoolManagement.Three}
                  Four={SchoolManagement.Four}
                  Five={SchoolManagement.Five}
                  Six={SchoolManagement.Six}
                  Seven={SchoolManagement.Seven}
                  // Eight={SchoolManagement.Eight}
                />
                <div className="container row mt--40 row--15 m-auto justify-content-around en-section-gap">
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
                        to="/app/login-as"
                      >
                        Learn More About School Management Software
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="section background">
              <div className="container" id="apps">
                <div className="row">
                  <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
                    <h1>School Management Software Gallery </h1>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <NewTimeline TimelineData={TimelineData} />
            <Separator /> */}

            {/* <div className="section background">
              <div className="container" id="apps"> */}
            {/* <div className="row">
                  <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
                    <h1>ATL-StemLab Gallery </h1>
                    
                  </div>
                </div> */}
            {/* <div className="row mb--20">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle=""
                      title="ATL-StemLab Gallery"
                    />
                  </div>
                </div> */}
            {/* </div>
            </div> */}
            {/* <NewTimeline TimelineData={TimelineDataSecond} /> */}

            <div className="rwt-counterup-area rn-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle="Customizable counters"
                      title="Counters Custom Elements"
                      description=""
                    />
                  </div>
                </div>
                <CounterUpFour
                  column="col-lg-3 col-md-6 col-sm-6 col-12"
                  counterStyle="counter-style-4"
                  textALign="text-center"
                />
              </div>
            </div>

            <div className="rwt-elements-area rn-section-gap">
              <div className="container">
                <div className="row mb--20">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle="Client Feedback"
                      title="Testimonial."
                    />
                  </div>
                </div>
                <TestimonialThree teamStyle="" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt--10">
                <BrandCarousel
                  data={{
                    url: 'https://www.teachmint.com/static2/images/new-landing/school-1.png',
                    height: 100,
                  }}
                />
              </div>
            </div>

            <div className="rwt-brand-area rn-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle="Our Awesome Client"
                      title="Brand Style."
                      description=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mt--10">
                    <BrandThree brandStyle="brand-style-2" />
                  </div>
                </div>
              </div>
            </div>

            <SliderSlick cardStyle="card-style-1" textAlign="text-start" />
            {/* <div className="about-area about-style-4 rn-section-gap">
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
              <div className="rwt-brand-area ">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <SectionTitle
                        textAlign="text-center"
                        radiusRounded=""
                        subtitle=""
                        title="Features & Contents of E-Learning App"
                        description=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Features
              One={AtaltinkeringLab.One}
              Two={AtaltinkeringLab.Two}
              Three={AtaltinkeringLab.Three}
              Four={AtaltinkeringLab.Four}
              Five={AtaltinkeringLab.Five}
              Six={AtaltinkeringLab.Six}
              Seven={AtaltinkeringLab.Seven}
              Eight={AtaltinkeringLab.Eight}
            /> */}

            {/* <div className="about-area about-style-4 rn-section-gap">
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
                      src="https://img.icons8.com/color/480/000000/rocket--v2.png"
                      width="50%"
                      height="auto"
                      alt="text"
                    />
                  </div>
                  <div className="col-lg-6 mt_md--40 mt_sm--40 AboutFour__Text__PM">
                    <div className="content ">
                      <div className="inner">
                        <h3 className="theme-gradient">E- Learning App</h3>
                        <h5>Application</h5>
                        <p>Our Aim</p>
                        <ul className="feature-list">
                          <li>
                            <div className="icon">
                              <FiCheck />
                            </div>
                            <div className="title-wrapper">
                              <h4 className="title">
                                This platform helps students with self Learn,
                                Practice, & Test at their own pace
                              </h4>
                            </div>
                          </li>
                        </ul>
                      </div>
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
                            title="Features & Contents of E-Learning App"
                            description=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Features
                  One={ELearningApp.One}
                  Two={ELearningApp.Two}
                  Three={ELearningApp.Three}
                  Four={ELearningApp.Four}
                  Five={ELearningApp.Five}
                  Six={ELearningApp.Six}
                  Seven={ELearningApp.Seven}
                  Eight={ELearningApp.Eight}
                />
              </div>
            </div> */}

            {/* <div className="about-area about-style-4 rn-section-gap">
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
                      src="https://img.icons8.com/color/480/000000/rocket--v2.png"
                      width="50%"
                      height="auto"
                      alt="text"
                    />
                  </div>
                  <div className="col-lg-6 mt_md--40 mt_sm--40 AboutFour__Text__PM">
                    <div className="content ">
                      <div className="inner">
                        <h3 className="theme-gradient">School Management</h3>
                        <h5>Software</h5>
                        <p>Our Aim</p>
                        <ul className="feature-list">
                          <li>
                            <div className="icon">
                              <FiCheck />
                            </div>
                            <div className="title-wrapper">
                              <h4 className="title">
                                TComplete digitization of school is not just the
                                automation of admin and teacher tasks but also
                                providing an AI-based assistant to students
                                during home work
                              </h4>
                            </div>
                          </li>
                        </ul>
                      </div>
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
                            title="All in one for School Admin, Teacher, & Students"
                            description=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Features
                  One={SchoolManagement.One}
                  Two={SchoolManagement.Two}
                  Three={SchoolManagement.Three}
                  Four={SchoolManagement.Four}
                  Five={SchoolManagement.Five}
                  Six={SchoolManagement.Six}
                  Seven={SchoolManagement.Seven}
                  // Eight={SchoolManagement.Eight}
                />
              </div>
            </div> */}
            <div className="row screenshots">
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
          </div>
        </div>
        {/* End Inner Pages  */}
        <FooterThree />
      </div>
    </>
  );
};

export default Splash;
