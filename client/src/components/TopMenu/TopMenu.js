import React from "react";
import { useState, useEffect, useRef, createRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import './TopMenu.css';

import gsap from 'gsap';



const Temp = (props) => {

  const $root = useRef()
  const $indicator1 = useRef()
  const $indicator2 = useRef()
  const $items = useRef(props.items.map(createRef));
  const [ active, setActive ] = useState(0);

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect()
    const activeItem = $items.current[active].current
    const { width, height, top, left } = activeItem.getBoundingClientRect()
    
    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: '#eeb316',
      ease: 'elastic.out(.7, .7)',
      duration: .8
    }
    
    gsap.to($indicator1.current, {
      ...settings,
    })
    
    gsap.to($indicator2.current, {
      ...settings,
      duration: 1
    })
  }

  useEffect(() => {
    animate()
    window.addEventListener('resize', animate)
    
    return (() => {
      window.removeEventListener('resize', animate)
    })    
  }, [active])

  
  return (
    <div
      ref={$root}
      className="menu"
    >
      {props.items.map((item, index) => (
        <a
          key={item.name}
          ref={$items.current[index]}
          className={`item ${active === index ? 'active' : ''}`}
          onMouseEnter={() => {
            setActive(index)
          }}
          onClick={item.click}
         >
          {item.name}
        </a>
      ))}
      <div
        ref={$indicator1}
        className="indicator"
       />
      <div
        ref={$indicator2}
        className="indicator"
       />
    </div>
  );
};

export default Temp;
