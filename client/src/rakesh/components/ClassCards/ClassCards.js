import React, { useEffect, useState } from "react";
import "../style.css";

import { IconContext } from "react-icons";
import Navbars from "../nav/Navbars";
import ClassCard from "./ClassCard";
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

const ClassCards = () => {
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
      <div className="row d-flex flex-column mb-5">
        <div className="NavPage-container">
          <div className="NavPage-Carousels container">
            <div>
              <p style={{ textAlign: "center", color: "#000" }}>
                Get solutions for all your school needs
              </p>
              <h1>Complete School Solutions</h1>
            </div>
          </div>
        </div>
        <div className="NavPage-container">
          <ClassCard />
        </div>
      </div>
    </>
  );
};

export default ClassCards;
