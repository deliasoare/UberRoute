import { useRef, useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
const Header = function Header({setFromDestination, setToDestination, history, buttonRef}) {
    const [sidebarIsOpened, setSidebarIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (sidebarIsOpened) {
            sidebarRef.current.style.visibility = 'visible';
            sidebarRef.current.classList = 'sidebar fade-in';
        }
        else {
            sidebarRef.current.classList = 'sidebar fade-out';
            setTimeout(() => {
                sidebarRef.current.style.visibility = 'hidden';
            }, 150)
        }
        return () => {
            sidebarRef.current.classList = 'sidebar';
        }
    }, [sidebarIsOpened])

    const openSidebar = () => {
        setSidebarIsOpen(true);
    }

    const closeSidebar = () => {
        setSidebarIsOpen(false);
    }

    console.log(buttonRef.current);
    return (
        <div className='header'>
            <p className='title'>Uber Route</p>
            <button onClick={openSidebar} className='openSidebar'>History</button>
            <Sidebar forwardedRef={sidebarRef} closeSidebar={closeSidebar} history={history} setFromDestination={setFromDestination} setToDestination={setToDestination}/>
        </div>
    );
}

export default Header;