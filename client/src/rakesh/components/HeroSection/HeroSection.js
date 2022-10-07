import React from "react";
import "./style.css";
const HeroSection = () => {
  return (
    <>
      <div className="row mt-2 p-5 text-center mb-0 Hero-Padding">
        <div className="col-12">
          <h1>Enter Workforce Agility</h1>
          <p>Empower your people and your business to achieve anything</p>
        </div>
      </div>

      <div class="row  m-auto HeroSection-main-row my-10 p-5 d-flex justify-content-center  ">
        <div class="col-12 col-md-6 col-lg-6 mr-12  text-black tm-hdg-16 tm-lg-20 mt-24 text-sm-left text-md-left text-lg-left d-flex flex-column justify-content-center  ">
          <div className="row d-flex justify-center">
            <h1 className="font-weight-bold HeroSection-header-text float-left text-left">
              Integrated
            </h1>{" "}
            <br />
            <h1 className="font-weight-bold HeroSection-header-text float-left text-left">
              School Platform
            </h1>{" "}
          </div>
          <div className="row">
            <p className="text-left">
              Manage every need of your school on a single platform
            </p>
          </div>
          <div className="text-left">
            <a
              class="btn btn-primary align-baseline HeroSection-btn-color  cursor-pointer"
              href="#"
              role="button"
            >
              Get Started For Free
            </a>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6 mt-7 d-flex justify-center align-center HeroSection-image-row ">
          <img
            class="HeroSection-anil-kapoor-title h-sm-25 w-sm-25"
            src="https://www.teachmint.com/static2/images/new-landing/anil-kapoor-feature.jpg"
            loading="lazy"
            alt="schools"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
