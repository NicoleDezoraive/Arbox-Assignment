import React , { useState, useEffect } from 'react'
import Floor from "./floor/Floor"


const Building = () => {
  const floorsNames = ["Ground Floor", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
  const numberOfElevators = 5;

  const [calls, setCalls] = useState([]);

  useEffect(() => {
    // handle elevator algorithm
    // take the first element in calls queue
    // go over all elevator, take all the availble elevators and coose the closest one
  }, [calls])

  const [floors, setFloors] = useState([...floorsNames.map((floorName, index) => ({
    status: "Call",
    name: floorName,
    index: index,
    time: 0
  }))]);

  const [elevators, setElevators] = useState([...Array(numberOfElevators)].map(() => ({
    status: "available",
    floorNumber: 0,
  })));

  console.log({floors, elevators, calls})

  const hasElevators = (number) =>{
    return elevators.map((elevator)=>elevator?.floorNumber === number);
  };

  const callElevator = (floorNumber) => {
    setFloors((prevFloor) => prevFloor.map(floor => {
      if (floor.index === floorNumber) {
        floor.status = "Waiting"
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
             index= {floor.index}
             callElevator={callElevator}
             time={floor.time} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Building;
