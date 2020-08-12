import React from 'react'
import { useState, useEffect } from 'react';
import { IonText } from '@ionic/react';

interface ComponentProps {
  mins: number;
  timerFinished: () => void;
}

const Timer = ({ mins, timerFinished }: ComponentProps) => {
    const [ minutes, setMinutes ] = useState(mins);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            if (minutes === 0 && seconds === 0) {
                timerFinished()
            }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <IonText style={{color: 'var(--tan)', fontSize: '24px', fontWeight: 'bold'}}>
                {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}
              </IonText> 
        }
        </div>
    )
}

export default Timer;