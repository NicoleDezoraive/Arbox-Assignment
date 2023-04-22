import React , { useState } from 'react'
import ButtonsCall from "../ButtonsCall"
import IconElevator from "../../images/icons8-elevator.svg"

function Floor({name, numberOfElevators, status, index, time, elevators, callElevator}) 
{
    // console.log({name, elevators});
    // const [status, setStatus] = useState("Call");

    // const handleClick = () => {
    //     setIsWaiting(true);
    //   };

    return (
        <tr key={name}>
            <th className="floor-numbers">{name}</th>
            {elevators.map((elevator, index) => ( 
            <td className="cell" key={`${name}${index}`}> {elevator && <img className="icon-elevator" src={IconElevator} alt=""/>}</td> 
            ))}
            <td className="cell-buttons-call">
            <ButtonsCall callElevator={callElevator} floorNumber={index} isWaiting={status === "Waiting"}></ButtonsCall>
        </td> 
        
        </tr>
    
    )
}

export default Floor