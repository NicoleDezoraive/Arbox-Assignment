import React, { useState, useEffect, useRef  } from 'react';
import {ReactComponent as IconElevator} from "../../images/icons8-elevator.svg"
import ElevatorArrivedSound from '../../sounds/elevator_arrival_bell.mp3';

function Elevator({status, floorNumber, time, destination}) 
{
    const [animationDuration, setAnimationDuration] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const elevatorRef = useRef(null);

    useEffect(() => {
        // Calculate the animation duration based on the number of floors
        const numFloors = Math.abs(destination - floorNumber);
        const duration = (numFloors)*7 ; // 7 seconds per floor

        setAnimationDuration(duration);
        const containerHeight = elevatorRef.current.getBoundingClientRect().height;
        const floorHeight = containerHeight / (numFloors-1); 
        const currentPosition = floorHeight * (floorNumber)+1;
        setCurrentPosition(currentPosition);
      }, [floorNumber, destination]);

    let color = 'black';
    if (status === 'Available') {
        color = 'black';
    } else if (status === 'Busy') {
        color = 'red';
    } else if (status === 'Arrived') {
        color = 'green';
    }
    
    return (
        <div className="elevator-container" ref={elevatorRef}>
            <IconElevator className="icon-elevator" style={{fill: color, animationDuration: `${animationDuration}s`,
                                                        animationName: destination < floorNumber ? 'elevator-down' : 'elevator-up' }}/>
            {status === 'Arrived' && <audio src={ElevatorArrivedSound} autoPlay />} 
        </div>
    
    )
}

export default Elevator;