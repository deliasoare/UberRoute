import { useState, useEffect } from 'react';
import Map from './Map.jsx'
import ToFromFields from './ToFromFields.jsx';
import Result from './Result.jsx';

function Main() {
    const [resultIsShown, setResultIsShown] = useState(false);
    const [result, setResult] = useState('');
    const [toDestination, setToDestination] = useState('Choose destination');
    const [fromDestination, setFromDestination] = useState('Choose starting point');
    const [resultRequest, setResultRequest] = useState(false);

    useEffect(() => {
        if (resultRequest) {
            // getResult api (toDestination, fromDestination)
            setResult(fromDestination + ' ' + toDestination);
            setResultIsShown(true);
        }
        
        return () => {
            setResultRequest(false);
        }
    }, [resultRequest])
    return (
        <div className='main'>
            <Map />
            <ToFromFields setFromDestination={setFromDestination} setToDestination={setToDestination} fromDestination={fromDestination} toDestination={toDestination} setResultRequest={setResultRequest}/>
            <Result resultIsShown={resultIsShown} result={result}/> 
        </div>
    )
}

export default Main;