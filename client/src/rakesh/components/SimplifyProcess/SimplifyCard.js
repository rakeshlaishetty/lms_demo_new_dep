import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

function SimplifyCard(props) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === props.data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  console.log(props.data[1].iseven);
  return (
    <div class="container SimplifyCard__container">
      {props.data.map((item) => {
        return (
          <div
            class={`row m-5 ${item.iseven ? `SimplifyCard__row__wrap` : ``}`}
          >
            <div class="col-6">
              <div class="row m-auto SimplifyCard__row">
                <div className="SimplifyCard__text__div__inside">
                  <p className="h3" style={{ color: "red" }}>
                    Finance management{" "}
                  </p>
                  <br />
                  <p className="h5 text-left SimplifyCard__HeadText">
                    Keep track, reduce costs and <br />
                    eliminate administrative hassle
                  </p>
                  <div class="col-xs-6 mt-4">
                    <div class="mini-box mt-4">
                      <h4
                        className={` ${
                          index == 0
                            ? `SimplifyCard__Head__active`
                            : `SimplifyCard__Head`
                        }`}
                      >
                        Simplified fee management
                      </h4>
                      <p
                        className={`${
                          index == 0
                            ? `SimplifyCard__para__active`
                            : `SimplifyCard__para__`
                        } `}
                      >
                        Customize fee structures and provide discounts and
                        offers with ease
                      </p>
                    </div>
                  </div>
                  <div class="col-xs-6 mt-4">
                    <div class="mini-box mt-4">
                      <h4
                        className={` ${
                          index == 1
                            ? `SimplifyCard__Head__active`
                            : `SimplifyCard__Head`
                        }`}
                      >
                        Enable dynamic fee structures
                      </h4>
                      <p
                        className={`${
                          index == 1
                            ? `SimplifyCard__para__active`
                            : `SimplifyCard__para__`
                        } `}
                      >
                        Manage fees, payments, reminders and invoices seamlessly
                      </p>
                    </div>
                  </div>
                  <div class="col-xs-6 mt-4">
                    <div class="mini-box mt-4">
                      <h4
                        className={` ${
                          index == 2
                            ? `SimplifyCard__Head__active`
                            : `SimplifyCard__Head`
                        }`}
                      >
                        Access intelligent reports
                      </h4>
                      <p
                        className={`${
                          index == 2
                            ? `SimplifyCard__para__active`
                            : `SimplifyCard__para__`
                        } `}
                      >
                        Stay on top of all your expenses and receivables with
                        insightful financial reports
                      </p>
                    </div>
                  </div>
                </div>
                <div className="SimplifyCard__LearMore__btn">
                  <p className="btn btn-primary ">
                    <a href="#">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div className="slideshow">
                <div
                  className="slideshowSlider"
                  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                  {colors.map((backgroundColor, index) => (
                    <div className="slide" key={index}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="340"
                          image="https://www.teachmint.com/static2/images/new-landing/web-sol-3.webp"
                          alt="green iguana"
                        />
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="slideshowDots">
                  {colors.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slideshowDot${
                        index === idx ? " active" : ""
                      }`}
                      onClick={() => {
                        setIndex(idx);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SimplifyCard;
