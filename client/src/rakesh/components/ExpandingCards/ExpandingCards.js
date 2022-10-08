import React, { useState, useEffect } from "react";
import Card from "./Card";

const ExpandingCards = (props) => {
  const [carddata, setcarddata] = useState(props.data);

  const onCardClick = (id) => {
    const newState = [...carddata];
    newState.map((item) => {
      item.id === id ? (item.active = true) : (item.active = false);
    });

    setcarddata(newState);
  };
  return (
    <>
      {carddata.map((card) => {
        return (
          <Card
            key={card.id}
            data={card}
            onCardClick={() => onCardClick(card.id)}
          />
        );
      })}
    </>
  );
};

export default ExpandingCards;
