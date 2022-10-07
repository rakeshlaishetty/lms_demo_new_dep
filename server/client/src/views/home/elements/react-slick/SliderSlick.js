/* eslint-disable */
import * as React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from 'react-slick';

const ServiceList = [
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664103097/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__6_-removebg-preview_kodkh4.png',
    title: 'School Management Software',
    description: '',
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664104972/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__9_-removebg-preview_sn3vwp.png',
    title: 'ATL/STEM Lab  Solutions',
    description: '',
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664105783/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__11_-removebg-preview_mzitx4.png',
    title: 'Self study  Platform',
    description: '',
  },
  {
    image:
      'https://res.cloudinary.com/db0vkpdye/image/upload/v1664106000/Website%20LMS%20images/Home%20page%20icons/Blue_and_Yellow_Neon_Icons_Icon_Set__12_-removebg-preview_cq9xba.png',
    title: 'Personalized Learning Platform',
    description: '',
  },
];

const SliderSlick = ({ textAlign, cardStyle }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef();
  const slider2 = useRef();

  return (
    <div className="row row--15 service-wrapper">
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {ServiceList.map((val, i) => (
          <div className="" key={i}>
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
                      to="#service"
                    >
                      Take a Tour
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSlick;
