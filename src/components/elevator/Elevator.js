import React, { useState, useEffect } from 'react';
import {ReactComponent as IconElevator} from "../../images/icons8-elevator.svg"
import ElevatorArrivedSound from '../../sounds/elevator_arrival_bell.mp3';

function Elevator({status, floorNumber, time}) 
{
    const [currentFloor, setCurrentFloor] = useState(0);
    const [animationDuration, setAnimationDuration] = useState(0);

    let color = 'black';
    if (status === 'Available') {
        color = 'black';
    } else if (status === 'Busy') {
        color = 'red';
    } else if (status === 'Arrived') {
        color = 'green';
    }

    // const audio = new Audio(ElevatorArrivedSound);
    // audio.play();

    
    useEffect(() => {
        const timePerFloor =1000 * 60 //1000 * time; // time in seconds
        const distanceToFloor = Math.abs(floorNumber - currentFloor);
        const newAnimationDuration = distanceToFloor * timePerFloor;
        setAnimationDuration(newAnimationDuration);
        setCurrentFloor(floorNumber);
    }, [floorNumber]);


    return (
        <div>
            <IconElevator className="icon-elevator" style={{ fill: color }}/>
            {status === 'Arrived' && <audio src={ElevatorArrivedSound} autoPlay />}
        </div>
    
    )
}

export default Elevator;