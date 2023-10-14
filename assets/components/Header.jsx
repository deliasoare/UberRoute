
import Sidebar from './Sidebar.jsx';
const Header = function Header({setFromDestination, setToDestination, history, buttonRef}) {

    console.log(buttonRef.current);
    return (
        <div className='header'>
            <p className='title'>Uber Route</p>
            <button className='openSidebar'>History</button>
            <Sidebar />
        </div>
    );
}

export default Header;