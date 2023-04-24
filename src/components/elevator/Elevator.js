import React, { useState, useEffect } from 'react';
import {ReactComponent as IconElevator} from "../../images/icons8-elevator.svg"

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

    // const style = {
    //     fill: color,
    //     transition: `transform ${animationDuration}s linear`,
    //     animation-duration: `${animationDuration}ms`,
    //     animation-timing-function: linear;
    //     animation-iteration-count: infinite;
    // };
    
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
        </div>
    
    )
}

export default Elevator;