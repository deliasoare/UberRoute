import { useEffect } from 'react';

const emissionPerLiter = 2.50;
const litersPerKm = 10 / 100;

function Distance({ leg, type, setTime, setDistance, setCarbon, prevTime, prevDistance, prevCarbon}) {
    let color;
    if (type === 'public')
        color = '#000000';
    else if (type === 'ridesharing')
        color = 'yellow';
    else
        color = 'gray';
    const distance = leg.distance.text;
    const time = leg.duration.text;

    const disMeters = leg.distance.value;
    const timeSec = leg.duration.value;

    const carbon = ( litersPerKm * (disMeters / 1000) ) * emissionPerLiter;

    useEffect(() => {
        if (type === "public" || type === "ridesharing") {
            setTime(prevTime + timeSec);
            setDistance(prevDistance + disMeters);
            setCarbon(prevCarbon + carbon);
        }
    }, [disMeters, timeSec, carbon])

    return (
        <div className='infoRoute'>
            <div className='routeColor' style={{background: color, width: '20px', height: '20px', display: 'inline-block'}}></div>
            <span className='routeInfo'>  - <b>Distance:</b> {distance} <b>Time:</b> {time} <b>Carbon emitted:</b> {carbon.toFixed(2)}</span>
        </div>
    );
}
export default Distance;