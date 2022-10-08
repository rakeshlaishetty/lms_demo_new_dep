import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import defaultUser from '../../assets/img/profiles/default-user.png'

const SingleLightbox = ({ className, large }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavLink to="#" location={{}} onClick={() => setIsOpen(true)}>
        <img src={defaultUser} alt="thumbnail" className={className} />
      </NavLink>

      {isOpen && (
        <Lightbox mainSrc={large} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
};
export default SingleLightbox;
