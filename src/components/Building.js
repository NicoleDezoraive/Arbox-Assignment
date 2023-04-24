import React , { useState, useEffect } from 'react';
import Floor from "./floor/Floor";
import { useLocation } from 'react-router-dom';
// import DayJS from 'react-dayjs';


const Building = () => {
  const location = useLocation();
  // const floorsNames = ["Ground Floor", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
  const floorsNames = getFloorNames(location.state.numFloors);
  const numberOfElevators = parseInt(location.state.numElevators);

  const [calls, setCalls] = useState([]);
  const [timeForFloorSec, setTimeForFloor] = useState(7); 
  
  //floors
  const [floors, setFloors] = useState([...floorsNames.map((floorName, index) => ({
    status: "Call",
    name: floorName,
    index: index,
    time: 0
  }))]);

  //elevators
  const [elevators, setElevators] = useState([...Array(numberOfElevators)].map((_, index) => ({
    status: "Available",
    floorNumber: 0,
    destination: 0,
    id: index,
    eta: 0,
    timeTookArrive: 0
  })));

  function getFloorNames(numFloors) {
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

  // elevator algorithm
  function getClosestElevator(calls, elevators) {
    const availableElevators = elevators.filter(elevator => elevator.status === "Available");
    if (availableElevators.length === 0) {
      return null; // No available elevators
    }
    const sortedElevators = availableElevators.sort((a, b) => {
      const distanceToCallA = Math.abs(a.floorNumber - calls[0]);
      const distanceToCallB = Math.abs(b.floorNumber - calls[0]);
      return distanceToCallA - distanceToCallB;
    });
    return sortedElevators[0];
  }

  function calculateTimeTakesReachFloor(currentFloor, targetFloor, speed) {
    const distance = Math.abs(targetFloor - currentFloor);
    const timeInSeconds = (distance / speed) * timeForFloorSec;
    return timeInSeconds;
  }

    //Countdown - Time left for the elevator to arrive
  useEffect(() => {
    const timers = elevators
      .filter(elevator => elevator.status === 'Busy')
      .map(elevator => {
        const timer = setInterval(() => {
          setElevators(prevElevators => prevElevators.map(prevElevator => {
            if (prevElevator.id === elevator.id) {
              return { ...prevElevator, eta: prevElevator.eta - 1 };
            }
            return prevElevator;
          }));
        }, 1000);
        return timer;
      });
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [elevators]);


  useEffect(() => {
    if (calls.length === 0) {
      return;
    }
    let firstCall;
    const sortedElevator = getClosestElevator(calls, elevators);
    if (!sortedElevator) {
      return;
    }
    else{
      firstCall = calls[0];
      setCalls(prevArray => prevArray.slice(1));
      console.log(firstCall);
    }
    
    setElevators((prevElevator) => prevElevator.map(elevator => {
      if (elevator.id === sortedElevator.id) {
        elevator.status = "Busy";
        elevator.destination = firstCall;
        elevator.eta = calculateTimeTakesReachFloor(elevator.floorNumber, firstCall, 1); // calculate the timeout value
        let newFloorNumber = elevator.floorNumber;
        console.log("newFloorNumber: ",newFloorNumber);
        const startTime = new Date().getTime();
        const timer = setInterval(() => {
          
          if(newFloorNumber < firstCall){
            newFloorNumber = newFloorNumber + 1
          }
          else if(newFloorNumber > firstCall){
            newFloorNumber = newFloorNumber - 1
          }
          console.log("newFloorNumber: ",newFloorNumber, "firstCall:", firstCall );
          if (newFloorNumber === firstCall) {
            clearInterval(timer);
            const endTime = new Date().getTime();
            const timeTookArrive = endTime - startTime;
            
            setElevators(prevElevator => prevElevator.map(elevator => { 
              if (elevator.id === sortedElevator.id) {
                return {
                  ...elevator,
                  status: "Arrived",
                  floorNumber: firstCall,
                  timeTookArrive: timeTookArrive/1000
                };
              }
              return elevator;
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
            // console.log("elevator.floorNumber: ", elevator.floorNumber,"firstCall: ",firstCall )
           
          }
          
          setElevators(prevElevator => prevElevator.map(elevator => {
            if (elevator.id === sortedElevator.id) {
              return { ...elevator, floorNumber: newFloorNumber};
            }
            return elevator;
            
          }));
          
        }, timeForFloorSec*1000);
        return { ...elevator };
      }
      
      return elevator;
      
    }))

    // go over all elevator, take all the availble elevators and coose the closest one
  }, [calls, elevators, floors])

  useEffect(() => {
    elevators.forEach(elevator => {
      if (elevator.status === "Arrived") {
        setTimeout(() => {
          setElevators(prevElevator => prevElevator.map(prevElevator => {
            if (prevElevator.id === elevator.id) {
              return { ...prevElevator, status: "Available" };
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

  

  console.log({floors, elevators, calls})


  const callElevator = (floorNumber) => {
    // if(!interval){
    //   setInterval(1000);
    // }
    setFloors((prevFloor) => prevFloor.map(floor => {
      if (floor.index === floorNumber) {
        floor.status = "Waiting"
        floor.time = 300; // set time for elevator to reach the floor to 5 minutes (300 seconds)
      } else {
        floor.time = 0; // reset time for all other floors to 0
      }
      return floor;
    }))

    setCalls(prevCalls => {
      // console.log({prevCalls})
      return [...prevCalls, floorNumber]})
  }

  return (
    <div className="elevator-table">
      <table className="table">
        <thead>       
        </thead>
        <tbody>
          {floors.slice().reverse().map((floor) => (
            <Floor
             name={floor.name} 
             numberOfElevators={numberOfElevators}
             status= {floor.status}
             elevators= {elevators}
             floorNumber= {floor.index}
             callElevator={callElevator}
             time={floor.time}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Building;
