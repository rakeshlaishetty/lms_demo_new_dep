/* eslint no-nested-ternary: 0 */
import React from 'react';

const getMenuTitle = () => {
  const d = new Date();
  const time = d.getHours();

  const user = window.localStorage.getItem('user');

  if (time < 12) {
    return `Good morning, ${user === 'admin' ? 'Admin' : user === 'teacher' ? 'Teacher' : 'Student'}`;
  }
  if (time >= 12 && time < 16) {
    return `Good afternoon, ${user === 'admin' ? 'Admin' : user === 'teacher' ? 'Teacher' : 'Student'}`;
  }
  return `Good evening, ${user === 'admin' ? 'Admin' : user === 'teacher' ? 'Teacher' : 'Student'}`;
};

const Greeting = () => {
  return <h1>{getMenuTitle()}</h1>;
};

export default Greeting;
