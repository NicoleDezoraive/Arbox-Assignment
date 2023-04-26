import React, { useState, useEffect, useRef } from 'react';
import {ReactComponent as IconElevator} from "../../images/icons8-elevator.svg"
import ElevatorArrivedSound from '../../sounds/elevator_arrival_bell.mp3';
// import { SwitchTransition, CSSTransition } from 'react-transition-group';
// import { useSpring, animated } from 'react-spring';
function Elevator({status, floorNumber, time, destination}) 
{
    let color = 'black';
    if (status === 'Available') {
        color = 'black';
    } else if (status === 'Busy') {
        color = 'red';
    } else if (status === 'Arrived') {
        color = 'green';
    }
    
    // const springProps = useSpring({
    //     // If the destination floor is not the first floor, move the elevator up
    //     top: destination !== 1 ? (destination - 1) * 100 : 0,
    //     // If the destination floor is not the first floor, move the elevator down
    //     bottom: destination !== 1 ? 'auto' : 0
        
    //   });
    // const startTimeRef = useRef(null);
    // const [position, setPosition] = useState(0);

    // const style = ({
         
    //     x: "50" ,
    //     y: 100 - {position},
    //     width: "50" ,
    //     height: "50",
    //     fill: color
            
    //       });

    

    // const moveObject = (timestamp) => {
    //     if (!startTimeRef.current) {
    //     startTimeRef.current = timestamp;
    //     }
    //     const elapsedTime = timestamp - startTimeRef.current;
    //     const newPosition = Math.min((elapsedTime / 1000) * 100, 100);
    //     setPosition(newPosition);
    //     if (elapsedTime < 1000 * 7) {
    //         requestAnimationFrame(moveObject);
    //     }
    // };

    // useEffect(() => {
    //     requestAnimationFrame(moveObject);
    // }, []);

    return (
        <div>
            {/* <animated.svg style={springProps} className="icon-elevator"> */}
                 <IconElevator className="icon-elevator" style={{fill: color}}/>
            {/* </animated.svg> */}
            

            {/* TODO : RETUEN AUDIO */}
            {/* {status === 'Arrived' && <audio src={ElevatorArrivedSound} autoPlay />} */} 
        </div>
    
    )
}

export default Elevator;