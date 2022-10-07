import React from "react";
import "./BrandCarouselStyle.css";
const BrandCarousel = (props) => {
  const { height, url } = props.data;

  return (
    <>
      <div
        className={`${
          height == 100
            ? "row BrandCarousel-containers-100"
            : "row BrandCarousel-containers-350"
        }`}
      >
        <div className="BrandCarousel-marquee">
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
          <div className="BrandCarousel-slider BrandCarousel-img1">
            <img src={url} height="100%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCarousel;
