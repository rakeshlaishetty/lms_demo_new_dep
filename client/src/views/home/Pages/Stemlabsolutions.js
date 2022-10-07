/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import Separator from "../elements/separator/Separator";
import SectionTitle from '../elements/sectionTitle/SectionTitle';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import GalleryOne from '../elements/gallery/GalleryOne';
import ScrollAnimation from 'react-animate-on-scroll';
import TimelineOne from '../elements/timeline/TimelineOne';
import SEO from '../common/SEO';
import '../assets/scss/style.css';
import Layout from '../common/Layout';

const Stemlabsolutions = () => {
  const Demo = [
    {
      Url: '/business-consulting',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/business-consulting-light.png',
      Title: 'Business Consulting',
      badge: '',
    },

    {
      Url: '/business-consulting-2',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/business-consulting-2-light.png',
      Title: 'Business Consulting',
      badge: '',
    },
    {
      Url: '/corporate',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/corporate-light.png',
      Title: 'Corporate',
      badge: '',
    },
    {
      Url: '/startup',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/startup-light.png',
      Title: 'Startup',
      badge: 'New',
    },
    {
      Url: '/web-agency',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/web-agency-light.png',
      Title: 'Web Agency',
      badge: 'New',
    },
    {
      Url: '/international-consulting',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/international-consulting-light.png',
      Title: 'International Consulting',
      badge: 'New',
    },
    {
      Url: '/consulting',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/consulting-light.png',
      Title: 'Consulting',
      badge: 'Hot',
    },
    {
      Url: '/finance',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/finance-light.png',
      Title: 'Finance',
      badge: '',
    },
    {
      Url: '/digital-agency',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/digital-agency-light.png',
      Title: 'Digital Agency',
      badge: '',
    },
    {
      Url: '/seo-agency',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/seo-agency-light.png',
      Title: 'SEO Agency',
      badge: '',
    },

    {
      Url: '/company',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/company-light.png',
      Title: 'Company',
      badge: '',
    },
    {
      Url: '/personal-portfolio',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/personal-portfolio-light.png',
      Title: 'Personal Portfolio',
      badge: '',
    },
    {
      Url: '/freelancer',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/freelancer-light.png',
      Title: 'Freelancer',
      badge: 'Hot',
    },
    {
      Url: '/marketing',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/marketing-light.png',
      Title: 'Marketing Agency',
      badge: '',
    },
    {
      Url: '/travel-agency',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/travel-agency-light.png',
      Title: 'Travel Agency',
      badge: '',
    },

    {
      Url: '/business',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/business-light.png',
      Title: 'Business',
      badge: '',
    },

    {
      Url: '/event-conference',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/event-conference-light.png',
      Title: 'Event Conference',
      badge: '',
    },
    {
      Url: '/creative-portfolio',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/creative-portfolio-light.png',
      Title: 'Creative Portfolio',
      badge: '',
    },

    {
      Url: '/about-us',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/corporate-about-light.png',
      Title: 'Corporate About',
      badge: '',
    },

    {
      Url: '#demo',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/coming-soon.png',
      Title: 'Finance Consulting',
      badge: '',
    },

    {
      Url: '#demo',
      Image: 'https://picsum.photos/200/300?random',
      Imagelight: './images/demo/coming-soon.png',
      Title: 'Finance Consulting',
      badge: '',
    },
  ];
  const PopupData = [
    {
      id: '01',
      image: 'https://picsum.photos/200/300?random',
      popupLink: [
        './images/portfolio/portfolio-01.jpg',
        'https://www.youtube.com/watch?v=ctsT5Y-InqE&ab_channel=Rainbow-Themes',
        './images/portfolio/portfolio-03.jpg',
        './images/portfolio/portfolio-04.jpg',
        'https://www.youtube.com/watch?v=ctsT5Y-InqE&ab_channel=Rainbow-Themes',
        './images/portfolio/portfolio-05.jpg',
      ],
    },
    {
      id: '02',
      image: 'https://picsum.photos/200/300?random',
      popupLink: [
        'https://www.youtube.com/watch?v=ctsT5Y-InqE&ab_channel=Rainbow-Themes',
      ],
    },
    {
      id: '03',
      image: 'https://picsum.photos/200/300?random',
      popupLink: ['./images/portfolio/portfolio-03.jpg'],
    },
    {
      id: '04',
      image: 'https://picsum.photos/200/300?random',
      popupLink: ['./images/portfolio/portfolio-04.jpg'],
    },
    {
      id: '05',
      image: 'https://picsum.photos/200/300?random',
      popupLink: [
        'https://www.youtube.com/watch?v=ctsT5Y-InqE&ab_channel=Rainbow-Themes',
      ],
    },
    {
      id: '06',
      image: 'https://picsum.photos/200/300?random',
      popupLink: ['./images/portfolio/portfolio-05.jpg'],
    },
  ];
  return (
    <>
      <SEO title="Doob" />
      <div className="page-wrapper">
        <Layout>
          <div className="rn-demo-area rn-section-gap" id="demo">
            <div className="wrapper plr--150 plr_lg--30 plr_md--30 plr_sm--30">
              <div className="row">
                <div className="col-lg-12">
                  <SectionTitle
                    textAlign="text-center"
                    radiusRounded=""
                    subtitle="All Demo Here"
                    title="Doob All Demo."
                    description="We create a business and consulting react template with 60+ elements features. <br /> 19+ demo pages, faster loading and well documentated code."
                  />
                </div>
              </div>
              <div className="row row--30">
                {Demo.map((data) => (
                  <div className="col-lg-4 col-md-6 col-12 mt--40" key={data}>
                    <div className="single-demo">
                      <Link to={`${data.Url}`}>
                        <div className="thumbnail">
                          <img
                            className="image-dark"
                            src="https://picsum.photos/200/300?random"
                            alt="Corporate Images"
                          />
                          <img
                            className="image-light"
                            src={`${data.Imagelight}`}
                            alt="Corporate Images"
                          />
                          {data.badge ? (
                            <span className="label-badge">{data.badge}</span>
                          ) : (
                            ''
                          )}
                        </div>
                      </Link>
                      <h4 className="title">
                        <Link to={`${data.Url}`}>{data.Title}</Link>{' '}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <SectionTitle
                textAlign="text-center"
                radiusRounded=""
                subtitle="End TO End TO Solution"
                title="for Futuristic lab"
                description="We create a business and consulting react template with 60+ elements features. <br /> 19+ demo pages, faster loading and well documentated code."
              />
            </div>
          </div>

          <div className="rwt-about-area about-style-2 rn-section-gap">
            <div className="container">
              <div className="row row--30 align-items-center">
                <div className="col-lg-12 mt_md--30 mt_sm--30">
                  <div className="content">
                    <div className="section-title">
                      <ScrollAnimation
                        animateIn="fadeInUp"
                        animateOut="fadeInOut"
                        animateOnce={true}
                      >
                        <h4 className="subtitle">
                          <span className="theme-gradient">
                            Corporate About.
                          </span>
                        </h4>
                        <h2 className="title mt--10">END-TO-END SOLUTION</h2>
                      </ScrollAnimation>

                      <ScrollAnimation
                        animateIn="fadeInUp"
                        animateOut="fadeInOut"
                        animateOnce={true}
                      >
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Sed quod autem sequi reprehenderit labore
                          consequuntur excepturi voluptatibus omnis similique
                          qui unde eligendi tempora, ea at, laudantium nostrum
                          minus pariatur quasi!
                        </p>

                        <ul className="list-icon">
                          <li>
                            <span className="icon">
                              <FiCheck />
                            </span>{' '}
                            Track your teams progress with mobile app.
                          </li>
                          <li>
                            <span className="icon">
                              <FiCheck />
                            </span>{' '}
                            Lorem ipsum dolor sit amet consectetur adipisicing.
                          </li>
                          <li>
                            <span className="icon">
                              <FiCheck />
                            </span>{' '}
                            Ipsum dolor sit amet consectetur adipisicing.
                          </li>
                          <li>
                            <span className="icon">
                              <FiCheck />
                            </span>{' '}
                            Your teams progress with mobile app.
                          </li>
                        </ul>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn="fadeInUp"
                        animateOut="fadeInOut"
                        animateOnce={true}
                      >
                        <div className="read-more-btn mt--40">
                          <Link className="btn-default btn-icon" to="#">
                            More About Us{' '}
                            <i className="icon">
                              <FiArrowRight />
                            </i>
                          </Link>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content">
            {/* Start Timeline Area  */}
            <div className="rwt-timeline-area rn-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle="Objective"
                      title="For class 4<sup>th</sup> to 10<sup>th</sup>."
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <TimelineOne />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rwt-gallery-area rn-section-gapBottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb--20">
                  <SectionTitle
                    textAlign="text-center"
                    radiusRounded=""
                    subtitle="Gallery With Lightbox"
                    title="Gallery Style Two."
                    description=""
                  />
                </div>
              </div>
              <div className="row mt_dec--30 row--15">
                {PopupData.map((item) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12 mt--30"
                    key={item.id}
                  >
                    <GalleryOne galleryItem={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Stemlabsolutions;
