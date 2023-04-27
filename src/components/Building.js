import React , { useState, useEffect } from 'react';
import Floor from "./floor/Floor";
import { useLocation } from 'react-router-dom';

const Building = () => {
  const location = useLocation();

  const getFloorNames = (numFloors) =>  {
    const floorNames = ["Ground Floor"];
    const suffix = ["th", "st", "nd", "rd"];
    for (let i = 1; i < numFloors; i++) {
      if (i >= 11 && i <= 13) {
        floorNames.push(`${i}${suffix[0]}`);
      } else {
        floorNames.push(`${i}${suffix[i % 10 < 4 ? i % 10 : 0]}`);
      }
    }
    return floorNames;
  }

  const floorsNames = getFloorNames(location.state.numFloors);
  const numberOfElevators = parseInt(location.state.numElevators);

  const [calls, setCalls] = useState([]);
  const timeForFloorSec= 7;
  
  //floors
  const [floors, setFloors] = useState([...floorsNames.map((floorName, index) => ({
    status: "Call",
    name: floorName,
    index: index,
  }))]);

  //elevators
  const [elevators, setElevators] = useState([...Array(numberOfElevators)].map((_, index) => ({
    status: "Available",
    floorNumber: 0,
    destination: undefined,
    id: index,
    eta: 0,
    timeTookArrive: 0, 
    nextTotalWaitingTimeElevator: 0,
    nextCall: undefined,
    time: 0
  })));

  

  function getSmallestKElevatorETATime(k, floorNumber) {
    // Sort elevators by ETA in ascending order
    const copyElevators = [...elevators];
    const sortElevatorsByETA = copyElevators.sort((elevator1, elevator2) => (elevator1.eta) - (elevator2.eta));
    // Get the smallest K ETA times
    let smallestKElevatorID = sortElevatorsByETA[k%floorNumber].id;
    const selectedElevator = elevators.find(elevator => elevator.id === smallestKElevatorID);
    const totalWaitingTimeElevator = selectedElevator.eta + Math.abs(selectedElevator.destination - floorNumber)*timeForFloorSec

    setElevators(prevElevators => prevElevators.map(prevElevator => {
      if (prevElevator.id === smallestKElevatorID) {
          return { ...prevElevator, nextTotalWaitingTimeElevator:  totalWaitingTimeElevator, nextCall: floorNumber};
      }
      return prevElevator;
    }));
  }

  // elevator algorithm
  function getClosestElevator(callFloor, elevators) {
    const availableElevators = elevators.filter(elevator => elevator.status === "Available");
    if (availableElevators.length === 0) {
      return null; // No available elevators
    }
    const closestElevator = availableElevators.reduce((prev, curr) => {
    return Math.abs(curr.floorNumber - callFloor) < Math.abs(prev.floorNumber - callFloor) ? curr : prev;
    });
    return closestElevator;
  }

  function calculateTimeTakesReachFloor(currentFloor, targetFloor, speed) {
    const distance = Math.abs(targetFloor - currentFloor);
    const timeInSeconds = (distance / speed) * timeForFloorSec;
    return timeInSeconds;
  }

    //Countdown - Time left for the elevator to arrive
  // useEffect(() => {
  //   const timers = elevators
  //     .filter(elevator => elevator.status === 'Busy')
  //     .map(elevator => {
  //       const timer = setInterval(() => {
  //         setElevators(prevElevators => prevElevators.map(prevElevator => {
  //           // if (prevElevator.id === elevator.id && prevElevator.nextTotalWaitingTimeElevator !== 0) {
  //           //   return { ...prevElevator, nextTotalWaitingTimeElevator: prevElevator.nextTotalWaitingTimeElevator - 1 };
  //           // }
  //           if (prevElevator.id === elevator.id) {
  //             return { ...prevElevator, time: prevElevator.time - 1 };
  //           }
  //           return prevElevator;
  //         }));
  //       }, 1000);
  //       return timer;
  //     });
  //   return () => {
  //     timers.forEach(timer => clearInterval(timer));
  //   };
  // }, [elevators]);

  useEffect(() => {
    if (calls.length === 0) {
      return;
    }
    const closestElevator = getClosestElevator(calls, elevators);
    if (closestElevator === null) {
      return;
    }
    let firstCall = calls[0];
    
    setElevators((prevElevators) => prevElevators.map(elevator => {
      if(firstCall === closestElevator.floorNumber){
            setCalls(prevArray => prevArray.slice(1));
            setElevators(prevElevator => prevElevator.map(updatedElevator => { 
              if (updatedElevator.id === closestElevator.id) {
                return {
                  ...updatedElevator,
                  status: "Arrived",
  
                };
              }
              return updatedElevator;
            }));
            setFloors(prevFloor => prevFloor.map(floor => {
              if (floor.index === firstCall) {
                return {
                  ...floor,
                  status: "Arrived",
                };
              }
              return floor;
            }));
      }
      else if (elevator.id === closestElevator.id) {
        elevator.status = "Busy";
        setCalls(prevArray => prevArray.slice(1));
        elevator.destination = firstCall;
        elevator.eta = calculateTimeTakesReachFloor(elevator.floorNumber, elevator.destination, 1); 
        elevator.time = elevator.eta
        let newFloorNumber = elevator.floorNumber;
        const startTime = new Date().getTime();
        const timer = setInterval(() => {
          if(newFloorNumber < firstCall){
            newFloorNumber = newFloorNumber + 1
          }
          else if(newFloorNumber > firstCall){
            newFloorNumber = newFloorNumber - 1
          }
         
          if (newFloorNumber === firstCall) {
            clearInterval(timer);
            const endTime = new Date().getTime();
            const timeTookArrive = endTime - startTime;
            
            setElevators(prevElevator => prevElevator.map(updatedElevator => { 
              if (updatedElevator.id === closestElevator.id) {
                return {
                  ...updatedElevator,
                  status: "Arrived",
                  floorNumber: firstCall,
                  destination: updatedElevator.nextCall,
                  nextCall: undefined,
                  eta: updatedElevator.nextTotalWaitingTimeElevator,       
                  timeTookArrive: timeTookArrive/1000
                };
              }
              return updatedElevator;
            }));
            setFloors(prevFloor => prevFloor.map(floor => {
              if (floor.index === firstCall) {
                return {
                  ...floor,
                  status: "Arrived",
                };
              }
              return floor;
            }));
          }
          
          setElevators(prevElevator => prevElevator.map(elevator => {
            if (elevator.id === closestElevator.id) {
              let newETA = calculateTimeTakesReachFloor(elevator.floorNumber,elevator.destination,1);
               return { ...elevator,floorNumber: newFloorNumber, status:elevator.status, eta: newETA};
            }
            return elevator;
          }));
          
        }, timeForFloorSec * 1000);
        return { ...elevator };
      }
      
      return elevator;
    }))
  
  }, [calls, elevators])

  useEffect(()=>{
    const sortedElevator = getClosestElevator(calls, elevators);
    if (sortedElevator === null) {
      calls.forEach((call, index)=>{
        getSmallestKElevatorETATime(index, call);
      })
      return;
    }
  },[calls])

  useEffect(() => {
    elevators.forEach(elevator => {
      if (elevator.status === "Arrived") {
        setTimeout(() => {
          setElevators(prevElevator => prevElevator.map(prevElevator => {
            if (prevElevator.id === elevator.id && prevElevator.destination === undefined) {
              return { ...prevElevator, nextCell:undefined, status: "Available" };
            }
            else if (prevElevator.id === elevator.id ) {
              return { ...prevElevator, nextCell:undefined, status: "Busy" };
            }
            return prevElevator;
          }));
        }, 2000);
      }
    });
  }, [elevators]);

  useEffect(() => {
    floors.forEach(floor => {
      if (floor.status === "Arrived") {
        setTimeout(() => {
          setFloors(prevFloor => prevFloor.map(prevFloor => {
            if (prevFloor.index === floor.index) {
              return { ...prevFloor, status: "Call" };
            }
            return prevFloor;
          }));
        }, 2000);
      }
    });
  }, [floors]);

  const callElevator = (floorNumber) => {
    setFloors((prevFloor) => prevFloor.map(floor => {
      if (floor.index === floorNumber) {
        floor.status = "Waiting"
      } 
      return floor;
    }))
    setCalls(prevCalls => {
      return [...prevCalls, floorNumber]})
  }

  return (
    <div className="elevator-table">
      <table className="table">
        <thead>       
        </thead>
        <tbody>
          {floors.slice().reverse().map((floor) => (
            <Floor key={floor.name}
             name={floor.name} 
             status= {floor.status}
             floorNumber= {floor.index}
             elevators= {elevators}
             callElevator={callElevator}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Building;