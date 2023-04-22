import React , { useState } from 'react'

function ButtonsCall({floorNumber, callElevator, isWaiting}) 
{

    const handleClick = () => {
        callElevator(floorNumber)
      };

    return (
        <div className=''> 
            <button className={`button ${isWaiting ? "waiting" : ""}`} onClick={handleClick} id=''>{isWaiting ? "Waiting" : "Call"}</button>
        </div>
    )
}

export default ButtonsCall