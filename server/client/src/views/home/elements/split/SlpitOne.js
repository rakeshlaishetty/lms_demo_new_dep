/* eslint-disable */
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const SlpitOne = () => {
  return (
    <div className="rn-splite-style m-auto mt-5 mb-5">
      <div className="split-wrapper">
        <div className="row no-gutters radius-10 align-items-center d-flex flex-row justify-content-around mt-4">
          <div className="col-lg-6 col-xl-6 col-12 d-flex justify-content-around">
            <div className="thumbnail">
              <img
                style={{
                  height: '250px',
                  width: '250px',
                }}
                src="https://picsum.photos/200/300/?blur"
                alt="split Images"
              />
            </div>
            <div className="thumbnail image-left-content">
              <p style={{ color: '#fff' }}>Text</p>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-12 d-flex justify-content-around">
            <div className="thumbnail">
              <img
                style={{
                  height: '250px',
                  width: '250px',
                }}
                src="https://picsum.photos/200/300/?blur"
                alt="split Images"
              />
            </div>
            <div className="thumbnail image-left-content">
              <p style={{ color: '#fff' }}>Text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlpitOne;
