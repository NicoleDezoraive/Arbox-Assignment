import React, { useState, useEffect } from 'react';
import {ReactComponent as IconElevator} from "../../images/icons8-elevator.svg"
import ElevatorArrivedSound from '../../sounds/elevator_arrival_bell.mp3';

function Elevator({status, floorNumber, time}) 
{
    let color = 'black';
    if (status === 'Available') {
        color = 'black';
    } else if (status === 'Busy') {
        color = 'red';
    } else if (status === 'Arrived') {
        color = 'green';
    }

    return (
        <div>
            <IconElevator className="icon-elevator" style={{ fill: color }}/>
            {status === 'Arrived' && <audio src={ElevatorArrivedSound} autoPlay />}
        </div>
    
    )
}

export default Elevator;