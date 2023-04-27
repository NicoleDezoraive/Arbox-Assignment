import React , { useEffect , useState } from 'react'
import ButtonsCall from "../ButtonsCall"
import Elevator from "../elevator/Elevator"

function Floor({name, status, floorNumber, elevators, callElevator})
{
    return (
        <tr key={name}>
            
            <th className="floor-numbers">{name}</th>
            {elevators.map((elevator, index) => ( 
                
                <td className="cell" key={`${name}${index}`}>
                {elevator.floorNumber === floorNumber ? (
                  <Elevator status={elevator.status} floorNumber={elevator.floorNumber} destination={elevator.destination}/>
                ) : (
                  <>
                    {floorNumber === elevator.destination && elevator.time !== 0 && (
                      <>
                        {elevator.time < 60 ? (
                          `${elevator.time} sec.`
                        ) : (
                          `${Math.floor(elevator.time / 60)} min. ${elevator.time % 60} sec.`
                        )}
                      </>
                    )}
                  </>
                )}

                  {elevator.nextCall === floorNumber && elevator.nextTotalWaitingTimeElevator > 0 && (
              <>
                {elevator.nextTotalWaitingTimeElevator < 60 ? (
                  `${elevator.nextTotalWaitingTimeElevator} sec.`
                ) : (
                  `${Math.floor(
                    elevator.nextTotalWaitingTimeElevator / 60
                  )} min. ${elevator.nextTotalWaitingTimeElevator % 60} sec.`
                )}
              </>
            )}

              </td> 
            ))}
            <td className="cell-buttons-call">
            <ButtonsCall callElevator={callElevator} floorNumber={floorNumber} status={status}></ButtonsCall>
        </td> 
        
        </tr>
    
    )
}

export default Floor