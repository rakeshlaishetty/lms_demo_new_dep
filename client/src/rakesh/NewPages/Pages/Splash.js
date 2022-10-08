import React from "react";
import { Link } from "react-router-dom";
import SEO from "../common/SEO";
import HeaderOne from "../common/header/HeaderOne";
import HeaderTopNews from "../common/header/HeaderTopNews";
import Separator from "../elements/separator/Separator";
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import ServiceOne from "../elements/service/ServiceOne";
import ServiceTwo from "../elements/service/ServiceTwo";
import FooterThree from "../common/footer/FooterThree";
import { FiArrowDown } from "react-icons/fi";
import AboutFour from "../elements/about/AboutFour";
import AboutReverse from "../elements/about/AboutReverse";

const InnerPages = [
  {
    id: "1",
    Url: "/blog-grid",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Imagelight: "./images/demo/blog-grid-light.png",
    Title: "Blog Grid",
  },
  {
    id: "2",
    Url: "/blog-grid-sidebar",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Imagelight: "./images/demo/blog-grid-sidebar-light.png",
    Title: "Blog Grid Sidebar",
  },
  {
    id: "3",
    Url: "/blog-list-view",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Imagelight: "./images/demo/blog-list-view-light.png",
    Title: "Blog List View",
  },
];
const Demo = [
  {
    Url: "/business-consulting",
    Image: ".././images/demo/business-consulting.png",
    Imagelight: "../assets/images/slick-arrow-left-small.png",
    Title: "School Management Software",
    badge: "",
  },

  {
    Url: "/business-consulting-2",
    Image: "./images/demo/business-consulting-2.png",
    Imagelight: "./images/demo/business-consulting-2-light.png",
    Title: "STEM Lab Solutions",
    badge: "",
  },
  {
    Url: "/corporate",
    Image: "./images/demo/corporate.png",
    Imagelight: "./images/demo/corporate-light.png",
    Title: "Self Study Platform",
    badge: "",
  },
  {
    Url: "/startup",
    Image: "./images/demo/startup.png",
    Imagelight: "./images/demo/startup-light.png",
    Title: "Personalized Learning Platform",
    badge: "New",
  },
];

const Splash = () => {
  return (
    <>
      <SEO title="Doob" />
      <main className="page-wrapper">
        {/* <HeaderTopNews /> */}
        <HeaderOne
          btnStyle="btn-small round btn-icon"
          HeaderSTyle="header-not-transparent"
        />

        {/* Start Slider Area  */}
        {/* <div className="demo-slider-area slider-area bg-transparent slider-style-1 pb--100 pt--70">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner text-center">
                  <div className="react-image mb--20">
                    <img src="./images/demo/react-badge.png" alt="Doob React" />
                  </div>
                  <h1 className="title display-two">
                    Next-gen all-in-one <br />
                    <span className="theme-gradient">Business</span> &{" "}
                    <span className="theme-gradient">Consulting</span>
                    <br />
                    React Template.
                  </h1>
                  <p className="description">
                    We help our clients succeed by creating brand identities,
                    digital experiences, and print materials.
                  </p>
                  <div className="button-group">
                    <a
                      className="btn-default btn-large round btn-icon"
                      href="#demo"
                    >
                      View Demo <FiArrowDown />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End Slider Area  */}

        <div className="rn-service-area rn-section-gap-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="One stop Platform for Schools"
                  title="Complete school Solutions"
                  description="get solutions for all your school needs <br /> School Softwares and Solutions  "
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
                  subtitle="SUBTITLE"
                  title="Working Process"
                  description="We help our clients succeed by creating brand identities, <br /> digital experiences, and print materials."
                />
              </div>
            </div>
          </div>
        </div>
        <AboutFour image="./images/about/contact-image.jpg" />
        <AboutReverse image="./images/about/contact-image.jpg" />
        <AboutFour image="./images/about/contact-image.jpg" />
        <AboutReverse image="./images/about/contact-image.jpg" />

        {/* Start Our Demo  */}
        {/* <div className="rn-demo-area rn-section-gap" id="demo">
          <div className="wrapper plr--150 plr_lg--30 plr_md--30 plr_sm--30">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="One Stop Platform"
                  title="Complete School Solutions."
                  description="Get Solution All your School Needs <br /> "
                />
              </div>
            </div>
            <div className="row row--30">
              {Demo.map((data, index) => (
                <div className="col-lg-4 col-md-6 col-12 mt--40" key={index}>
                  <div className="single-demo">
                    <Link to={`${data.Url}`}>
                      <div className="thumbnail">
                        <img
                          className="image-dark"
                          src={`${data.Image}`}
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
                          ""
                        )}
                      </div>
                    </Link>
                    <h4 className="title">
                      <Link to={`${data.Url}`}>{data.Title}</Link>{" "}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* End Our Demo  */}

        <Separator />

        {/* Start Inner Pages  */}
        <div className="rn-inner-pages rn-section-gap">
          <div className="wrapper plr--150 plr_lg--30 plr_md--30 plr_sm--30">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  textAlign="text-center"
                  radiusRounded=""
                  subtitle="All Others Pages"
                  title="All Others Pages."
                  description="Have a nice inner pages include in doob template."
                />
              </div>
            </div>

            <div className="row">
              {InnerPages.map((data, index) => (
                <div className="col-lg-4 col-md-6 col-12 mt--40" key={index}>
                  <div className="single-demo">
                    <Link to={`${data.Url}`}>
                      <div className="thumbnail">
                        <img
                          className="image-dark"
                          src={`${data.Image}`}
                          alt="Corporate Images"
                        />
                        <img
                          className="image-light"
                          src={`${data.Imagelight}`}
                          alt="Corporate Images"
                        />
                      </div>
                    </Link>
                    <h4 className="title">
                      <Link to={`${data.Url}`}>{data.Title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* End Inner Pages  */}
        <FooterThree />
      </main>
    </>
  );
};

export default Splash;
