import React from "react";
import "./style.css";
const CardText = () => {
  return (
    <>
      {/* src="https://www.teachmint.com/static2/images/new-landing/persona-school.png" */}
      <div className="row container-fluid CardText-Padding">
        <div className="row" style={{ height: "250px" }}>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <span className="CardText-Span-1 block text-center  mt-2 clear-both font-bold text-black line-h-46 ">
                Enable better outcomes
              </span>{" "}
              <br />
              <span className="CardText-Span-2">for everyone</span>
            </div>
          </div>
        </div>
        <div className="row p-5">
          <div className="col-12 col-md-6 col-lg-6 mb-4">
            <div
              className="card border-0"
              style={{ maxwidth: "500px", backgroundColor: "#fffaeb" }}
            >
              <div className="row g-0">
                <div className="col-6" style={{ backgroundColor: "#fffaeb" }}>
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-black CardText-Heading ">
                      Schools
                    </h5>
                    <p className="card-text">
                      Automate operations, boost efficiency and reduce overheads
                      with the most powerful school management platform by your
                      side.
                    </p>
                  </div>
                </div>
                <div className="col-6" style={{ background: "#868e96" }}>
                  <img
                    src="https://www.teachmint.com/static2/images/new-landing/persona-school.png"
                    className="card-img-top h-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 mb-4">
            <div
              className="card border-0 bg-white"
              style={{ maxwidth: "500px" }}
            >
              <div className="row g-0">
                <div className="col-6" style={{ backgroundColor: "#eefdff" }}>
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-black CardText-Heading">
                      Teachers
                    </h5>
                    <p className="card-text">
                      Create an enriching learning environment through world-
                      class learning content along with digital tools that
                      simplify every classroom operation
                    </p>
                  </div>
                </div>
                <div className="col-6" style={{ background: "#868e96" }}>
                  <img
                    src="https://www.teachmint.com/static2/images/new-landing/persona-teacher.png"
                    className="card-img-top border-0 h-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 mb-4">
            <div
              className="card border-0"
              style={{ maxwidth: "500px", backgroundColor: "#f5eefe" }}
            >
              <div className="row g-0">
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-black CardText-Heading">
                      Students
                    </h5>
                    <p className="card-text">
                      Never miss a lesson with continuous learning at your
                      fingertips through classroom recordings, unlimited
                      practice questions and much more.
                    </p>
                  </div>
                </div>
                <div className="col-6" style={{ background: "#868e96" }}>
                  <img
                    src="https://www.teachmint.com/static2/images/new-landing/persona-student.png"
                    className="card-img-top h-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 mb-4">
            <div
              className="card border-0"
              style={{ maxwidth: "500px", background: "#fff3f7" }}
            >
              <div className="row g-0">
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-black CardText-Heading">
                      Parents
                    </h5>
                    <p className="card-text">
                      Monitor & track your children’s progress with complete
                      transparency and stay on top of all the school updates
                      with ease.
                    </p>
                  </div>
                </div>

                <div className="col-6" style={{ background: "#868e96" }}>
                  <img
                    src="https://www.teachmint.com/static2/images/new-landing/persona-parent.png"
                    className="card-img-top h-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardText;
