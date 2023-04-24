import React , { useEffect , useState } from 'react'
import ButtonsCall from "../ButtonsCall"
import Elevator from "../elevator/Elevator"

function Floor({name, numberOfElevators, status, floorNumber, time, elevators, callElevator, elevatorPositions}) 
{
    


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //       setTime(prevTime => prevTime - 1);
    //     }, 1000);
    
    //     return () => clearInterval(intervalId);
    //   }, []);



    return (
        <tr key={name}>
            
            <th className="floor-numbers">{name}</th>
            {elevators.map((elevator, index) => ( 
                
                <td className="cell" key={`${name}${index}`}>
                {elevator.floorNumber === floorNumber ? (
                  <Elevator status={elevator.status} floorNumber={elevator.floorNumber} />
                ) : (
                  <>
                    {floorNumber === elevator.destination && elevator.eta !== 0 && (
                      <>
                        {elevator.eta < 60 ? (
                          `${elevator.eta} sec.`
                        ) : (
                          `${Math.floor(elevator.eta / 60)} min. ${elevator.eta % 60} sec.`
                        )}
                      </>
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