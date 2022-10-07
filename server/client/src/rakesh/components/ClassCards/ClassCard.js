import * as React from "react";

import "./style.css";
export default function ClassCard() {
  return (
    <>
      <div className="ClassCard__Wrapper">
        <div
          className="d -flex flex-column flex-md-row"
          style={{ display: "flex", gap: "50px" }}
        >
          <div class="card-wrap">
            <div class="card-header one">
              <div className="card-header-img">
                <img src="https://qwings.in/images/milestone.png" />
              </div>
            </div>
            <div class="card-content">
              <h1 class="card-title">School Management Software</h1>
              {/* <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
              <button class="card-btn one">code</button>
            </div>
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <div className="card-header-img">
                <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/code-512.png" />
              </div>
            </div>
            <div class="card-content">
              <h1 class="card-title">AI, Coding & Robotics Lab Solutions</h1>
              {/* <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
              <button class="card-btn two">css3</button>
            </div>
          </div>
          <div class="card-wrap">
            <div class="card-header three">
              <div className="card-header-img">
                <img src="https://thumbs.dreamstime.com/b/online-education-platform-abstract-concept-vector-illustration-elearning-teaching-educational-courses-video-call-webcam-conference-201575807.jpg" />
              </div>
            </div>
            <div class="card-content">
              <h1 class="card-title">E-learning platform</h1>
              {/* <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
              <button class="card-btn three">html5</button>
            </div>
          </div>
          <div class="card-wrap">
            <div class="card-header four">
              <div className="card-header-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjc8JYpReI71uKW9tn1d3Ame7YF7vKauT5XQ&usqp=CAU" />
              </div>
            </div>
            <div class="card-content">
              <h1 class="card-title">Personalized Learning Platform</h1>
              {/* <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
              <button class="card-btn four">js</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
