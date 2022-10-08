import React from "react";
import "./style.css";
const MoveLikeStartup = (props) => {
  return (
    <div className="container-fluid MoveLikeStartup-wrapper my-10 p-5 mt-1">
      {props.data.map((item) => {
        return (
          <div className=" d-flex justify-content-center">
            <div className="col-12 col-md-6  ">
              <div className="row margin-left-auto mt-4 gap-3">
                <h2 className="text-center text-sm-center text-md-start text-lg-start MoveLikeStartup-h2-bold ">
                  {item.Headtext} <br />
                  {item.Headtext2}
                </h2>

                <ul>
                  <li>{item.listItem1}</li>
                  <li>{item.listItem2}</li>
                  <li>{item.listItem3}</li>
                </ul>
                {/* <p>
              In today’s market, organizations need to pivot rapidly and respond
              to disruptions
              <br />
              with ease.
            </p>
            <p>
              And employees need the freedom and access to build the careers of
              their dreams within
              <br /> their companies.{" "}
            </p>
            <p>Gloat was built to make this possible.</p> */}
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="row">
                <img src="https://gloat.com/wp-content/uploads/Group-28454-1.webp" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoveLikeStartup;
