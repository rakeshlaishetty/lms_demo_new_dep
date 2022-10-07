import React, { useEffect, useState } from "react";
import ExpandingCards from "./ExpandingCards/ExpandingCards";
import "./style.css";

import { IconContext } from "react-icons";
import Navbars from "./nav/Navbars";
const data = [
  {
    id: 1,
    title: "this is a title",
    url: "https://unsplash.com/photos/RxQGRXKShQ8",
    active: false,
  },
  {
    id: 2,
    title: "this is a title",
    url: "https://unsplash.com/photos/RxQGRXKShQ8",
    active: false,
  },
  {
    id: 3,
    title: "this is a title",
    url: "https://unsplash.com/photos/RxQGRXKShQ8",
    active: true,
  },
];

const NavPage = () => {
  const [FadeText, SetFadeText] = useState("Hello");
  const arrays = [
    "80,000 employees driving their career development",
    "A workforce of over 140,000 upskilling for the future",
    "Cross-functional teams forming overnight to meet customer needs",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      SetFadeText(arrays[Math.floor(Math.random() * (4 - 1))]);
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="NavPage__Container__fullPage">
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className=" row d-flex  flex-wrap flex-column NavPage-hero-section ">
            <Navbars />
          </div>
          <div className="row NavPage__Navpage__row">
            <div className="NavPage-container">
              <div className="NavPage-Carousels row">
                <div className="NavPage-Carousel col-md-6 col-lg-6 col-sm-12">
                  <section className="NavPage-cards">
                    <ExpandingCards data={data} />
                  </section>
                </div>
                <div className="NavPage-Carousel col-md-6 col-lg-6 col-sm-12">
                  <div className="NavPage-text-elements">
                    <div className="NavPage-text">
                      <p>THIS IS WORKFORCE AGILITY</p>
                      <h1>{FadeText}</h1>
                    </div>

                    <div className="NavPage-buttons">
                      <button id="btn-demo">Get Demo</button>
                      <button id="btn-whtsnext">Whats Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default NavPage;
