import React , { useState } from 'react'

function ButtonsCall({floorNumber, callElevator, status}) 
{

    const handleClick = () => {
        callElevator(floorNumber)
      };

    return (
        <div className=''> 
            <button className={`button ${status}`} onClick={handleClick} id=''>{status}</button>
        </div>
    )
}

export default ButtonsCall