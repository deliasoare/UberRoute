import { useMemo, useRef, useCallback } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "@react-google-maps/api";

import { FaArrowRight } from 'react-icons/fa';

import Place from './Places.jsx';

function ToFromFields({ mapRef }) {
    return (
        <div className='fieldsNButton'>
            <div className='fields'>
                <div className='fromDropdown'>
                    <p className='fromKeyword'>From:</p>
                    <Place setPlace={(position)=> {
                        mapRef.current?.panTo(position);
                    }} field={'from'}/>
                </div>
                <div className='arrow'> <FaArrowRight size={30}/> </div>
                <div className='toDropdown to'>
                    <p className='toKeyword'>To:</p>
                    <Place setPlace={(position) => {
                        mapRef.current?.panTo(position);
                    }} field={'to'}/>
                </div>
            </div>
            <button className='computeDestinations'>Compute</button>
        </div>
    )
}

function Map() {
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
            </GoogleMap>
        </div>
        <ToFromFields mapRef={mapRef}/>
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
