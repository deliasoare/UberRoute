
function Sidebar({forwardedRef, closeSidebar, history, setComputation}) {

    return (
        <div ref={forwardedRef} className="sidebar">
            <span className="closeSidebar" onClick={closeSidebar}>X</span>
            <div className="upperPart"></div>
            <div className="lowerPart">
                {history && history.map(route => {
                    return (
                        <p onClick={() => {setComputation(route)}} className='routeHistory'>{route.fromDestination} - {route.toDestination}</p>
                    );
                })}
            </div>
        </div>
    );
}
export default Sidebar;