import React from "react";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

const ServiceList = [
  {
    image:
      "https://img.freepik.com/premium-vector/students-are-learning-how-manage-business_18660-2619.jpg",
    title: "School Management Software",
    description: "",
  },
  {
    image:
      "https://img.freepik.com/free-vector/stem-education-logo-with-scientist-kids-cartoon-character_1308-62828.jpg",
    title: "STEM Lab Solutions",
    description: "",
  },
  {
    image:
      "https://img.freepik.com/premium-vector/online-education-self-study-concept-woman-sits-with-laptop-her-lap-studies-education-related-icons-set_531064-750.jpg",
    title: "Self Study Platform",
    description: "",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59N5paMDol9ruIo7IoXlbkyIm_ZjS6hKiyA&usqp=CAU",
    title: "Personalized Learning Platform",
    description: "",
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
              <div className="inner">
                <div className="image">
                  <Link to="#service">
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
                    Read More
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
