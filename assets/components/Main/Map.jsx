import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Polyline
} from "@react-google-maps/api";

import { FaArrowRight } from 'react-icons/fa';

import Place from './Places.jsx';

import MarkerImg from '../../images/marker.png';

function ToFromFields({ mapRef, setFromDestination, setToDestination, setFetchDirClicked }) {
    const fetchDir = () => {setFetchDirClicked(true);}
    return (
        <div className='fieldsNButton'>
            <div className='fields'>
                <div className='fromDropdown'>
                    <p className='fromKeyword'>From:</p>
                    <Place setPlace={(position)=> {
                        mapRef.current?.panTo(position);
                    }} field={'from'} setDestination={setFromDestination}/>
                </div>
                <div className='arrow'> <FaArrowRight size={30}/> </div>
                <div className='toDropdown to'>
                    <p className='toKeyword'>To:</p>
                    <Place setPlace={(position) => {
                        mapRef.current?.panTo(position);
                    }} field={'to'} setDestination={setToDestination}/>
                </div>
            </div>
            <button onClick={fetchDir} className='computeDestinations'>Compute</button>
        </div>
    )
}

function Map() {
    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');

    const [fetchDirClicked, setFetchDirClicked] = useState(false);
    const [directions, setDirections] = useState([]);

    const fetchDir = () => {
        if (!fromDestination || !toDestination) return;

        const service = new google.maps.DirectionsService
        service.route(
            {
                origin: fromDestination,
                destination: toDestination,
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {
                    modes: ['BUS'],
                    routingPreference: 'FEWER_TRANSFERS'
                 },
                 
            },
            (result, status) => {
                if (status === "OK" && result) {    
                    console.log(result);
                    setDirections(result);
                        
                }
            }
        )
    }

    useEffect(() => {
        fetchDir();
        return () => {
            setFetchDirClicked(false)
        }
    }, [fetchDirClicked])

    const mapRef = useRef(null);

    const center = useMemo(() => ({ lat: 43, lng: - 80}), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }))


    const onLoad = useCallback(map => (mapRef.current = map), [])
    return (
        <>
        <div class="mapContainer">
            <GoogleMap 
                zoom={10} 
                center={center} 
                mapContainerClassName="map" 
                options={options}
                onLoad={onLoad}>

                {directions && 
                <DirectionsRenderer directions={directions} options={{
                    polylineOptions: {
                        strokeColor: '#000000',
                        zIndex: 50,
                    }
                }}/>
                }
                {toDestination && 
                <Marker position={toDestination} 
                icon={{url: MarkerImg, scaledSize: new window.google.maps.Size(40, 40)}}
                />}
            </GoogleMap>
        </div>
        <ToFromFields mapRef={mapRef} setFromDestination={setFromDestination} setToDestination={setToDestination} setFetchDirClicked={setFetchDirClicked}/>
        </>
    );
}

export default Map;

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true
}
