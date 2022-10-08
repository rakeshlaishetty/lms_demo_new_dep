import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Timer = (props) => {
    const [hours, setHours] = useState(0);
    const [ minutes, setMinutes ] = useState(5);
    const [seconds, setSeconds ] =  useState(0);

    const history = useHistory();

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if(hours === 0 && minutes === 0 && seconds === 11){
                
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if(hours === 0){
                        clearInterval(myInterval);
                        // props.submitTest()
                    }else{
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className='mb-4'>
        { hours === 0 && minutes === 0 && seconds === 0
            ? 
            <p className='time' style={{fontSize: '0.95em'}}> 00 : 00</p>
            :  
            <p className='time' style={{fontSize: '0.95em'}}>{minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p>
        }
        </div>
    )
}

export default Timer;
