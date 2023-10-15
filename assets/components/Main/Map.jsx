import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Polyline
} from "@react-google-maps/api";
import polyline from 'google-polyline';
import { FaArrowRight } from 'react-icons/fa';

import Place from './Places.jsx';
import Distance from './Distance.jsx';
import Legend from './Legend.jsx';

import MarkerImg from '../../images/marker.png';
import CarMarker from '../../images/carMarker.svg';

function ToFromFields({ mapRef, setFromDestination, setToDestination, setFetchDirClicked, fromDestination, toDestination, history, setHistory, forwardedRef}) {
    const fetchDir = () => {setFetchDirClicked(true); setHistory([...history], {fromDestination, toDestination}); }
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
            <button onClick={fetchDir} ref={forwardedRef} className='computeDestinations'>Go</button>
        </div>
    )
}

function Map({fromDestination, toDestination, setFromDestination, setToDestination, history, setHistory, forwardedRef}) {

    const [fetchDirClicked, setFetchDirClicked] = useState(false);

    const [directions, setDirections] = useState('');
    const [additionalRoutes, setAdditionalRoutes] = useState('');

    const [cities, setCities] = useState([]);
    const [drivingResults, setDrivingResults] = useState([]);

    const [time, setTime] = useState(0);
    const [distance, setDistance] = useState(0);
    const [carbon, setCarbon] = useState(0);

    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const lat1Rad = (Math.PI * lat1) / 180;
        const lat2Rad = (Math.PI * lat2) / 180;
        const latDiff = (Math.PI * (lat2 - lat1)) / 180;
        const lonDiff = (Math.PI * (lon2 - lon1)) / 180;
      
        const a =
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
      
        return distance;
      }

    const fetchDir = () => {
        if (!fromDestination || !toDestination) return;
        setDirections('');
        setAdditionalRoutes('');
        setTime(0);
        setDistance(0);
        setCarbon(0);
        const service = new google.maps.DirectionsService;
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
                    setDirections(result);
                }
                else {
                    const service = new google.maps.DirectionsService;
                    service.route(
                    {
                        origin: fromDestination,
                        destination: toDestination,
                        travelMode: google.maps.TravelMode.DRIVING,
                        provideRouteAlternatives: true,
                         
                    },
                    (result, status) => {
                        if (status === "OK") {
                            let waypoints = polyline.decode(result.routes[0].overview_polyline);
                            let citiesArr = [];
                            setDrivingResults(result);
                            
                            function geocodeWaypoints() {
                            const geocoder = new google.maps.Geocoder();
                            const promises = waypoints.map(waypoint => {
                                return new Promise((resolve) => {
                                const latlng = new google.maps.LatLng(waypoint[0], waypoint[1]);
                                geocoder.geocode({ 'location': latlng }, function(results, status) {
                                    if (status === 'OK') {
                                    if (results[0]) {
                                        const addressComponents = results[0].address_components;
                                        for (let i = 0; i < addressComponents.length; i++) {
                                        const component = addressComponents[i];
                                        if (component.types.includes('locality')) {
                                            let cityNoted = false;
                                            citiesArr.forEach(city => {
                                            if (city.name === component.long_name)
                                                cityNoted = true;
                                            });
                                            if (!cityNoted) {
                                            citiesArr.push({ latlng, name: component.long_name });
                                            }
                                        }
                                        }
                                    }
                                    }
                                    resolve(); 
                                });
                                });
                            });
                            
                            return Promise.all(promises);
                            }
                            
                            geocodeWaypoints()
                            .then(() => {
                                let distances = [];
                                for (let i = 0; i < citiesArr.length; i++) {
                                    distances[i] = haversine(citiesArr[i].latlng.lat(), citiesArr[i].latlng.lng(), fromDestination.lat, fromDestination.lng);
                                }
                                for (let i = 0; i < citiesArr.length - 1; i++)
                                    for (let j = i + 1; j < citiesArr.length; j++)
                                        if (distances[i] < distances[j]) {
                                            [citiesArr[i], citiesArr[j]] = [citiesArr[j], citiesArr[i]];
                                            [distances[i], distances[j]] = [distances[j], distances[i]];
                                        }
                                setCities(citiesArr);
                            })
                            .catch(error => {
                                console.error('Error geocoding waypoints:', error);
                            });
                        }
                        else {
                            console.log("There's no such route.")
                        }
                    }
                )        
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

    useEffect(() => {
        if (cities.length) {
            async function computeDirections(cities, fromDestination) {
                const results = await Promise.all(
                  cities.map(city => {
                    return new Promise(async resolve => {
                      const service = new google.maps.DirectionsService;
                      const result = await new Promise(innerResolve => {
                        service.route({
                          origin: fromDestination,
                          destination: city.latlng,
                          travelMode: google.maps.TravelMode.TRANSIT,
                          transitOptions: {
                            modes: ['BUS'],
                            routingPreference: 'FEWER_TRANSFERS'
                          }
                        }, (result, status) => {
                          if (status === "OK") {
                            innerResolve({result, city: city});
                          } else {
                            innerResolve({result: null, city: null});
                          }
                        });
                      });
                      resolve(result);
                    });
                  })
                );
                const successfulResult = results.find(result => result.result !== null);
                
                if (successfulResult) {
                  return successfulResult;
                }
              }
              
              computeDirections(cities, fromDestination)
                .then((result) => {
                  if (result) {
                    setDirections(result.result);
                    const service = new google.maps.DirectionsService;
                    service.route(
                        {
                            origin: result.city.latlng,
                            destination: toDestination,
                            travelMode: google.maps.TravelMode.DRIVING,
                            provideRouteAlternatives: true
                        },
                        (result, status) => {
                            if (status === "OK") {
                                setAdditionalRoutes(result);
                            }
                        }
                        )
                  } 
                  else {
                    setAdditionalRoutes(drivingResults);
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            }
    }, [cities])

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
                    },
                    suppressMarkers: true
                }}/>
                }

                {additionalRoutes &&
                additionalRoutes.routes.map((route, index) => {
                    if (index < 3) {
                        return (
                            <Polyline 
                                key={index}
                                path={route.overview_path}
                                options={{
                                    strokeColor: index === 0 ? 'yellow' : 'gray',
                                    zIndex: index === 0 ? 50 : 25,
                                    strokeWeight: 4,
                                    clickable: false
                            }}/>
                        );
                    }
                })
                }
                {(directions || additionalRoutes) &&
                <div className='distanceTime'>
                    {directions && 
                    <Distance leg={directions.routes[0].legs[0]} type={'public'} setTime={setTime} setDistance={setDistance} setCarbon={setCarbon} prevTime={time} prevDistance={distance} prevCarbon={carbon}/> 
                    }
                    {additionalRoutes &&
                    additionalRoutes.routes.map((route, index) => {
                        if (index < 3)  {
                            return (
                                <Distance leg={route.legs[0]} type={index === 0 ? 'ridesharing' : 'alternative'} setTime={setTime} setDistance={setDistance} setCarbon={setCarbon}prevTime={time} prevDistance={distance} prevCarbon={carbon}/> 
                            );
                        }
                    })
                    }
                    {(time && distance && carbon) &&
                    <>
                        <hr></hr>
                        <p><b>Total:</b>  <b>Distance:</b>  {distance / 1000} km <b>Time:</b>  {parseInt(time / 3600)} hours {parseInt(((time - (parseInt(time/3600)* 3600))) / 60 + 0.5)} min  <b>Carbon emitted:</b> {carbon.toFixed(2)} </p> 
                    </>
                    }
                </div>
                }

                {toDestination && 
                <Marker position={toDestination} 
                icon={{url: MarkerImg, scaledSize: new window.google.maps.Size(40, 40)}}
                />}

                {fromDestination &&
                <Marker position={fromDestination}
                icon={{url: CarMarker, scaledSize: new window.google.maps.Size(40, 40)}}
                />
                }
            </GoogleMap>
        </div>
        <ToFromFields mapRef={mapRef} setFromDestination={setFromDestination} setToDestination={setToDestination} setFetchDirClicked={setFetchDirClicked} fromDestination={fromDestination} toDestination={toDestination} history={history} setHistory={setHistory} forwardedRef={forwardedRef}/>
        <Legend />
        </>
    );
}

export default Map;
