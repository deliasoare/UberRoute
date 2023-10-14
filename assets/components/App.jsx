import {useState, useRef, useEffect} from 'react';

import Header from './Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer.jsx';

import '../styles/styles.scss';
function App() {
    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [history, setHistory] = useState('');

    const computeRef = useRef(null);

    useEffect(() => {
        console.log(computeRef);
    }, [computeRef])
    return (
        <>
            <Header setFromDestination={setFromDestination} setToDestination={setToDestination} history={history} buttonRef={computeRef} />
            <Main fromDestination={fromDestination} toDestination={toDestination} setFromDestination={setFromDestination} setToDestination={setToDestination} history={history} setHistory={setHistory} forwardedRef={computeRef} />
            <Footer />
        </>
    )
}

export default App;