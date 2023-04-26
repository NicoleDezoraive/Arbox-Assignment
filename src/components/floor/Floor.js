import React , { useEffect , useState } from 'react'
import ButtonsCall from "../ButtonsCall"
import Elevator from "../elevator/Elevator"

function Floor({name, numberOfElevators, status, floorNumber, floorElevatorTime, elevators, callElevator, elevatorPositions}) 
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


                  {elevator.nextCall === floorNumber && (
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
            {/* {elevator.status === "Arrived" && console.log("here", "elevator", elevator, elevator.name) } */}
           {/* { elevator.destination === 0 && elevator.status === "Arrived"  && console.log("elevator.destination === floorNumber", elevator.destination === floorNumber, "elevator.destination", elevator.destination,"floorNumber", floorNumber , elevator.status === "Arrived" )} */}
            
              </td> 
            ))}
            <td className="cell-buttons-call">
            <ButtonsCall callElevator={callElevator} floorNumber={floorNumber} status={status}></ButtonsCall>
        </td> 
        
        </tr>
    
    )
}

export default Floor