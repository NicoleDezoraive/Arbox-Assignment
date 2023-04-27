import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home({}) 
{
    const [inputs, setInputs] = useState({
        numElevators: 5,
        numFloors: 10,
    });
    
    const handleChange = (e) => {
    setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/building`, {state: {numElevators: inputs.numElevators,numFloors :inputs.numFloors} });
    }

    return (
      <div className='home'>
        <form className='inputs'>
        <label>
          Number of Elevators ⬆️⬇️:
          <input required type="text" placeholder='5' name="numElevators" onChange={handleChange}/>
          </label>
          <label>
          Number of Floors 🏢:
          <input required type="text" placeholder='10' name="numFloors" onChange={handleChange}/>
          </label>
          <button className="show-building" onClick={handleSubmit}>Show Building</button>
        </form>
      </div>
    );
  };

export default Home