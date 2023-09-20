import { useState, useRef } from 'react';

function Dropdown({destinations, setDestination, currentDestination}) {
    const fieldRef = useRef(null);

    const toggleFields = () => {
        if (fieldRef.current.style.display === 'none') 
            fieldRef.current.style.display = 'block';
        else
            fieldRef.current.style.display = 'none';
    }
    const selectDestination = (e) => {
        setDestination(e.target.textContent);
        toggleFields();
    }

    return (
        <>
            <div onClick={toggleFields} className='selectedDestination'>{currentDestination}</div>
            <div className='otherFields' style={{display: 'none'}} ref={fieldRef}>
                {destinations.map((destination) => <p onClick={selectDestination} key={destination}>{destination}</p>)
                }
            </div>
        </>
    )
}

export default Dropdown;

