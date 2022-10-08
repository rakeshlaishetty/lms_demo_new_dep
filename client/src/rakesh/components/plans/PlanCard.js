import React from "react";
import "./PlanStyle.css";
const PlanCard = (props) => {
  const { data } = props;
  data.map((item) => {
    console.log(item);
  });
  return (
    <div class="col-md-4">
      <div class="Plan__pricing__table">
        {/* <!-- Table Head --> */}

        <h2 className="Plans__text__heading">Basic</h2>
        <h5 className="Plans__text__SubHead">Free</h5>
        {/* <!-- Features --> */}
        <div class="pricing-features">
          {data.map((item) => {
            return (
              <div class="feature">
                <span>
                  <img src="https://www.teachmint.com//static2/images/tfi/pricing-tick-green.svg" />{" "}
                </span>
                {item}
              </div>
            );
          })}
        </div>
        <span className="Plans__Span__Text">Get Started</span>
      </div>
    </div>
  );
};

export default PlanCard;
