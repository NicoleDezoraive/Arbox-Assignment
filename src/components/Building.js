import React , { useState, useEffect } from 'react'
import Floor from "./floor/Floor"


const Building = () => {
  const floorsNames = ["Ground Floor", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
  const numberOfElevators = 5;

  const [calls, setCalls] = useState([]); //shold be empty
  const [floors, setFloors] = useState([...floorsNames.map((floorName, index) => ({
    status: "Call",
    name: floorName,
    index: index,
    time: 0
  }))]);

  const [elevators, setElevators] = useState([...Array(numberOfElevators)].map((_, index) => ({
    status: "Available",
    floorNumber: 0,
    id: index
  })));

  useEffect(() => {
    if (calls.length === 0) {
      return;
    }
    const availableElevator = elevators.filter(elevator => elevator.status === "Available")[0];
    if (!availableElevator) {
      return;
    }
    // handle elevator algorithm
    const firstCall = calls[0];
    console.log(firstCall);

    setElevators((prevElevator) => prevElevator.map(elevator => {
      if (elevator.id === availableElevator.id) {
        elevator.status = "Busy";
        setCalls(prevArray => prevArray.slice(1));
        const timeout = 0.5 * 60 * 1000 / (Math.abs(elevator.floorNumber - firstCall) + 1); // calculate the timeout value
        let newFloorNumber = elevator.floorNumber;
        console.log("newFloorNumber: ",newFloorNumber);
        let i = elevator.floorNumber;
        const timer = setInterval(() => {
          if(i < firstCall){
            i = i + 1
          }
          else if(i > firstCall){
            i = i - 1
          }
          console.log("newFloorNumber: ",newFloorNumber, "firstCall:", firstCall ,"i:", i);
          if (newFloorNumber === firstCall) {
            clearInterval(timer);
            setElevators(prevElevator => prevElevator.map(elevator => {
              if (elevator.id === availableElevator.id) {
                return {
                  ...elevator,
                  status: "Arrived",
                  floorNumber: firstCall,
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
          newFloorNumber = i;
          setElevators(prevElevator => prevElevator.map(elevator => {
            if (elevator.id === availableElevator.id) {
              return { ...elevator, floorNumber: newFloorNumber };
            }
            return elevator;
          }));
          
        }, timeout);
        return { ...elevator, timer };
      }
      return elevator;
    }))


    // go over all elevator, take all the availble elevators and coose the closest one
  }, [calls])

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

   const hasElevators = (floorNumber) =>{
    const elevatorsForFloor = elevators.map((elevator)=>{
      // console.log("number: ",floorNumber, "ele:", elevator?.floorNumber)
      if(elevator?.floorNumber === floorNumber ){
        // console.log("elevaiter ", elevator)
        return elevator;
      }
      else{
        return{
         
        }  
      }
    });
    
    const updatedElevators = elevatorsForFloor.map((elevator) => {
          if(elevator.status === "Available"){
            return { 
              ...elevator,
              status: 'Available'
            };
          }
          else{
            return{
              ...elevator,
            }       
          }
          
        });;
        console.log({updatedElevators, elevators})
    return updatedElevators;
  };

  const callElevator = (floorNumber) => {
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
      console.log({prevCalls})
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
             elevators= {hasElevators(floor.index)}
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
