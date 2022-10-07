/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Typed from 'react-typed';
import SEO from '../common/SEO';
import HeaderOne from '../common/header/HeaderOne';
import SlpitOne from '../elements/split/SlpitOne';
import PricingOne from '../elements/pricing/PricingOne';
import TestimonialOne from '../elements/testimonial/TestimonialOne';
import SectionTitle from '../elements/sectionTitle/SectionTitle';
// import ServiceTwo from '../elements/service/ServiceTwo';
import FooterThree from '../common/footer/FooterThree';
// import AboutFour from '../elements/about/AboutFour';
// import AboutReverse from '../elements/about/AboutReverse';
import '../assets/scss/style.css';

const Splash = () => {
  const BannerData = [
    {
      image: '/images/bg/bg-image-20.jpg',
      title: 'Our Web <br /> Agecny Plan.',
      description:
        'We help our clients succeed by creating brand identities, <br /> digital experiences, and print materials.',
    },
  ];
  return (
    <>
      <SEO title="Doob" />
      <div className="page-wrapper">
        {/* <HeaderTopNews /> */}
        <HeaderOne
          btnStyle="btn-small round btn-icon"
          HeaderSTyle="header-not-transparent"
        />

        <div className="slider-area slider-style-1 bg-transparent variation-2 height-750">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 order-2 order-lg-1 mt_md--40 mt_sm--40">
                <div className="inner text-start">
                  <h1 className="title theme-gradient display-two">
                    Marketing Agency <br /> For{' '}
                    <Typed
                      strings={['Freelancer.', 'Developer.', 'Startup.']}
                      typeSpeed={80}
                      backSpeed={5}
                      backDelay={1000}
                      loop
                    />
                  </h1>
                  <p className="description">
                    We help our clients succeed by creating brand identities,
                    digital experiences, and print materials.
                  </p>
                  <div className="button-group">
                    <Link
                      className="btn-default btn-medium btn-border round btn-icon"
                      to="/school"
                    >
                      New Customer{' '}
                      <i className="icon">
                        <FiArrowRight />
                      </i>
                    </Link>
                    <Link
                      className="btn-default btn-medium btn-border round btn-icon"
                      to="/school"
                    >
                      Contact Us{' '}
                      <i className="icon">
                        <FiArrowRight />
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 order-1 order-lg-2">
                <div className="thumbnail">
                  <img src="./images/bg/bg-image-16.png" alt="Banner Images" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="slider-area slider-style-8 height-650">
          {BannerData.map((data) => (
            <div key={data} className="single-slide">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <div className="inner text-center d-flex flex-column">
                      <span className="subtitle theme-gradient">
                        Hello! This is WebAgency
                      </span>
                      <h1
                        className="title"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                      />
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                      <div className="button-group mt--30">
                        <a
                          className="btn-default btn-large round"
                          target="_blank"
                          rel="noreferrer"
                          href="https://themeforest.net/checkout/from_item/33571911?license=regular"
                        >
                          Explore Now
                        </a>
                        <a
                          className="btn-default btn-border btn-large round"
                          href="/schoolmanagement"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rwt-split-area rn-section-gap">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-12 mb--40">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="Split"
                  title="Splits created"
                  description=""
                />
              </div>
            </div>
            <SlpitOne />
          </div>
        </div>
        <div className="rwt-pricing-area rn-section-gap">
          <div className="container">
            <div className="row mb--40 mb_sm--0">
              <div className="col-lg-12">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="Pricing"
                  title="Pricing Style One."
                  description=""
                />
              </div>
            </div>
            <PricingOne />
          </div>
        </div>
        <div className="rwt-testimonial-area rn-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb--10">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="Client Feedback"
                  title="Testimonial."
                />
              </div>
            </div>
            <TestimonialOne
              column="col-lg-4 col-md-6 col-12 mt--30"
              teamStyle="card-style-default testimonial-style-one"
            />
          </div>
        </div>

        {/* End Inner Pages  */}
        <FooterThree />
      </div>
    </>
  );
};

export default Splash;
