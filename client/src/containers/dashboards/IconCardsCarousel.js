/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from 'components/cards/IconCard';
import GlideComponent from 'components/carousel/GlideComponent';

const IconCardsCarousel = ({
  className = 'icon-cards-row',
  user,
  studentsCount,
  teachersCount,
}) => {
  return (
    <div className={className}>
      {user === 'admin' ? (
        <GlideComponent
          settings={{
            gap: 5,
            perView: 4,
            type: 'carousel',
            breakpoints: {
              320: { perView: 1 },
              576: { perView: 2 },
              1600: { perView: 3 },
              1800: { perView: 4 },
            },
            hideNav: true,
          }}
        >
          <IconCard
            icon="iconsminds-student-hat"
            title="Students"
            value={studentsCount}
            className="mb-4"
          />
          <IconCard
            icon="iconsminds-blackboard"
            title="Classes"
            value="250"
            className="mb-4"
          />
          <IconCard
            icon="simple-icon-people"
            title="Teachers"
            value={teachersCount}
            className="mb-4"
          />
        </GlideComponent>
      ) : null}
    </div>
  );
};
export default IconCardsCarousel;
