import { useState, useEffect } from 'react';
import Map from  './Map.jsx';
import { useLoadScript } from "@react-google-maps/api";


function Main({fromDestination, toDestination, setFromDestination, setToDestination, history, setHistory, forwardedRef}) {
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

    return (
        <>
            {!isLoaded ? <></>
             :
            <div className='main'>
                <Map fromDestination={fromDestination} toDestination={toDestination} setFromDestination={setFromDestination} setToDestination={setToDestination} history={history} setHistory={setHistory} forwardedRef={forwardedRef}/>
            </div>
            }
        </>
    )
}

export default Main;