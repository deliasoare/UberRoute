import { useState, useRef } from 'react';

function Dropdown({destinations, setDestination, currentDestination}) {
    const fieldRef = useRef(null);

    const toggleFields = () => {
        console.log(fieldRef);
        if (fieldRef.current.style.visibility === 'visible') 
            fieldRef.current.style.visibility = 'hidden';
        else
            fieldRef.current.style.visibility = 'visible';
    }
    const selectDestination = (e) => {
        setDestination(e.target.textContent);
        toggleFields();
    }

    return (
        <>
            <div onClick={toggleFields} className='selectedDestination'>{currentDestination}</div>
            <div className='otherFields' style={{display: 'hidden'}} ref={fieldRef}>
                {destinations.map((destination) => <p onClick={selectDestination} key={destination}>{destination}</p>)
                }
            </div>
        </>
    )
}

export default Dropdown;

