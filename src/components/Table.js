import React from "react";
import ButtonsCall from "./ButtonsCall"
import IconElevator from "../images/icon-elevator.png"

const Table = () => {
  const rows = ["9th", "8th", "7th", "6th", "5th", "4th", "3rd", "2nd", "1st", "Ground Floor"];
  const columns = [1, 2, 3, 4, 5];

  return (
    <div className="elevator-table">
      <table className="table">
        <thead>       
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <th className="floor-numbers">{row}</th>
              {columns.map((column) => (
               
                <td className="cell" key={`${row}${column}`}> {row==="Ground Floor" && <img className="icon-elevator" src={IconElevator} alt="" />}</td>
                
              ))}
              <td className="cell-buttons-call">
              <ButtonsCall></ButtonsCall>
            </td> 
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
