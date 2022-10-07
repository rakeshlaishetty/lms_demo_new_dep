import React from "react";

const Card = (props) => {
  const { id, url, active, title } = props.data;
  return (
    <div
      key={id}
      className={`card ${active && "active"}`}
      style={{
        background: `url(${url}) no-repeat`,
      }}
      onClick={props.onCardClick}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default Card;
