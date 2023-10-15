import { useEffect } from 'react';

const emissionPerLiter = 2.50;
const litersPerKm = 10 / 100;

function Distance({ leg, type, setTime, setDistance, setCarbon, prevTime, prevDistance, prevCarbon, setTimeMessage}) {
    let color;
    if (type === 'public')
        color = '#000000';
    else if (type === 'ridesharing')
        color = 'yellow';
    else
        color = 'gray';

    function secondsToDHM(seconds) {
        const days = Math.floor(seconds / (60 * 60 * 24));
        seconds %= 60 * 60 * 24;
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minutes = Math.floor(seconds / 60);
        
        return { days, hours, minutes };
    }

    const disMeters = leg.distance.value;
    const timeSec = leg.duration.value;

    const distance = (disMeters / 1000).toFixed(2);
    
    let time = secondsToDHM(timeSec)

    const carbon = ( litersPerKm * (disMeters / 1000) ) * emissionPerLiter;

    useEffect(() => {
        if (type === "public" || type === "ridesharing") {
            let timeResult = prevTime + timeSec;
            setTime(prevTime + timeSec);
            setDistance(prevDistance + disMeters);
            setCarbon(prevCarbon + carbon);
            const timeVar = secondsToDHM(timeResult);
            setTimeMessage(`${(timeVar.days) ? `${timeVar.days} days`: ''} ${(timeVar.hours) ? `${timeVar.hours} hours` : '' } ${(timeVar.minutes) ? `${timeVar.minutes} min` : ''}`);
        }
    }, [disMeters, timeSec, carbon])

    let timeMessage = `${(time.days) ? `${time.days} days`: ''} ${(time.hours) ? `${time.hours} hours` : '' } ${(time.minutes) ? `${time.minutes} min` : ''}`;
    return (
        <>
        {disMeters ?
        <div className='infoRoute'>
            <div className='routeColor' style={{background: color, width: '20px', height: '20px', display: 'inline-block'}}></div>
            <span className='routeInfo'>  - <b>Distance:</b> {distance} km <b>Time:</b> {timeMessage} <b>Carbon emitted:</b> {carbon.toFixed(2)} CO2</span>
        </div>
        : ''}
        </>
    );
}
export default Distance;