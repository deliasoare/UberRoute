import { useState, useEffect } from 'react';
import Map from  './Map.jsx';
import { useLoadScript } from "@react-google-maps/api";


function Main() {
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

    useEffect(() => {
        console.log(isLoaded);
    }, [isLoaded])
    return (
        <>
            {!isLoaded ? <></>
             :
            <div className='main'>
                <Map />
            </div>
            }
        </>
    )
}

export default Main;