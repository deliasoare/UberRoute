import { useState, useEffect } from 'react';
import Map from  './Map.jsx';
import Result from './Result.jsx';
import { useLoadScript } from "@react-google-maps/api";


function Main() {
    const [key, setKey] = useState('');

    const fetchData = async () => {
        const data = await fetch("http://127.0.0.1:8000/getApiKey");
        let resp = await data.json();
        
    }

    const { isLoaded } = useLoadScript ({
        googleMapsApiKey: process.env.REACT_GOOGLE_MAPS_API_KEY,
        libraries:["places"]
    })

    useEffect(() => {
        fetchData();
    }, [])
    const [resultIsShown, setResultIsShown] = useState(false);
    const [result, setResult] = useState('');
    const [toDestination, setToDestination] = useState('Choose destination');
    const [fromDestination, setFromDestination] = useState('Choose starting point');
    const [resultRequest, setResultRequest] = useState(false);

    useEffect(() => {
        if (resultRequest) {
            let mockResult;
            if (fromDestination === 'Limassol')
                if (toDestination === 'Limassol')
                    mockResult = "You're already  here!"
                else if (toDestination === 'Starbucks')
                    mockResult = "Ridesharing"
                else if (toDestination === 'Mesa Geitonia')
                    mockResult = "Ridesharing"
                else if (toDestination === 'Agios Georgios Havouzas Church')
                    mockResult = "Ridesharing"
                else 
                    mockResult = "Ridesharing -> Bus Stop 3 -> Bus Stop 2 "
            else if (fromDestination === "Starbucks")
                if (toDestination === "Starbucks")
                    mockResult = "You're already  here!"
                else if (toDestination === "Limassol")
                    mockResult = "Ridesharing"
                else if (toDestination === 'Mesa Geitonia')
                    mockResult = "Ridesharing"
                else if (toDestination === 'Agios Georgios Havouzas Church')
                    mockResult = "Bus Stop 5 -> Bus Stop 2"
                else 
                    mockResult = "Ridesharing -> Bus Stop 3 -> Bus Stop 2 "
            else if (fromDestination === "Mesa Geitonia")
                if (toDestination === 'Mesa Geitonia')
                    mockResult = "You're already  here!"
                else if (toDestination === "Starbucks")
                    mockResult = "Ridesharing"
                else if (toDestination === "Limassol")
                    mockResult = "Ridesharing"
                else if (toDestination === 'Mesa Geitonia')
                    mockResult = "Ridesharing"
                else 
                    mockResult = 'Ridesharing -> Bus Stop 3 -> Bus Stop 2'
            else if (fromDestination === 'Agios Georgios Havouzas Church')
                if (toDestination === 'Agios Georgios Havouzas Church')
                    mockResult = "You're already  here!"
                else if (toDestination === "Starbucks")
                    mockResult = "Ridesharing"
                else if (toDestination === "Limassol")
                    mockResult = "Ridesharing"
                else if (toDestination === 'Mesa Geitonia')
                    mockResult = 'Bus Stop 5 -> Bus Stop 3 -> Ridesharing'
                else
                    mockResult = 'Bus stop 5 -> Bus Stop 2'
            else
                if (fromDestination === 'Agios Athanasios')
                    if (toDestination === 'Agios Athanasios')
                        mockResult = 'You are already here!'
                    else if (toDestination === 'Agios Georgios Havouzas Church')
                        mockResult = 'Bus stop 2 -> Bus Stop 5'
                    else if (toDestination === "Starbucks")
                        mockResult = 'Ridesharing'
                    else if (toDestination === 'Limassol')
                        mockResult = 'Ridesharing'
                    else 
                        mockResult = 'Ridesharing'

            setResult(mockResult);
            setResultIsShown(true);
        }
        
        return () => {
            setResultRequest(false);
        }
    }, [resultRequest])
    return (
        <>
            {!isLoaded ? <p>Loading</p> :
            <div className='main'>
                <Map />
                <Result resultIsShown={resultIsShown} result={result}/> 
            </div>
            }
        </>
    )
}

export default Main;