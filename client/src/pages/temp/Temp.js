import React from "react";
import { useState, useEffect, useRef, createRef, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import './Temp.css';

const Temp = () => {

  const[count, setCount] = React.useState(0);

  const onButtonClick = useCallback(() => {
	setCount(count+1)
  }, [])

  return(
    <div>
		<h1>{count}</h1>
		<button onClick={onButtonClick}>Incr</button>
	</div>)
};

export default Temp;
