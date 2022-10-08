/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

const ServiceList = [
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664103097/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__6_-removebg-preview_kodkh4.png',
    title: 'School Management Software',
    description: '',
    link: '/user/login-as'
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664104972/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__9_-removebg-preview_sn3vwp.png',
    title: 'ATL/STEM Lab <br> Solutions',
    description: '',
    link: ''
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664105783/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__11_-removebg-preview_mzitx4.png',
    title: 'Self study <br> Platform',
    description: '',
    link: 'https://www.qwings.org'
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664106000/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__12_-removebg-preview_cq9xba.png',
    title: 'Personalized Learning Platform',
    description: '',
    link: ''
  },
];
const ServiceTwo = ({ textAlign, cardStyle }) => {
  return (
    <div className="row row--15 service-wrapper">
      {ServiceList.map((val, i) => (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12" key={i}>
          <ScrollAnimation
            animateIn="fadeInUp"
            animateOut="fadeInOut"
            animateOnce={true}
          >
            <div className={`card-box ${cardStyle} ${textAlign}`}>
              <div
                className="inner"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  className="image"
                  style={{ height: 'auto', width: '100%' }}
                >
                  <Link to="/Schoolmanagement">
                    <img src={`${val.image}`} alt="card Images" />
                  </Link>
                </div>
                <div className="content">
                  <h4 className="title mb--20">
                    <Link
                      to="#service"
                      dangerouslySetInnerHTML={{ __html: val.title }}
                    ></Link>
                  </h4>
                  <p
                    className="description b1 color-gray mb--0"
                    dangerouslySetInnerHTML={{ __html: val.description }}
                  ></p>
                  <Link
                    className="btn-default btn-small btn-border"
                    to={{ pathname: val.link }} target="_blank"
                  >
                    Take a Tour
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      ))}
    </div>
  );
};
export default ServiceTwo;
