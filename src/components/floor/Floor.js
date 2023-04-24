import React , { useState } from 'react'
import ButtonsCall from "../ButtonsCall"
import Elevator from "../elevator/Elevator"

function Floor({name, numberOfElevators, status, floorNumber, time, elevators, callElevator, elevatorPositions}) 
{
    console.log(status)
    return (
        <tr key={name}>
            
            <th className="floor-numbers">{name}</th>
            {elevators.map((elevator, index) => ( 
                
            <td className="cell" key={`${name}${index}`}> {elevator.floorNumber === floorNumber && <Elevator status={elevator.status} floorNumber={elevator.floorNumber}/>}</td> 
            ))}
            <td className="cell-buttons-call">
            <ButtonsCall callElevator={callElevator} floorNumber={floorNumber} status={status}></ButtonsCall>
        </td> 
        
        </tr>
    
    )
}

export default Floor