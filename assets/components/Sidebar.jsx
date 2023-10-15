
function Sidebar({forwardedRef, closeSidebar, history, setComputation}) {
    return (
        <div ref={forwardedRef} className="sidebar">
            <span className="closeSidebar" onClick={closeSidebar}>X</span>
            <div className="upperPart"></div>
            <div className="lowerPart">
                {history && history.map(route => {
                    return (
                        <div onClick={() => {setComputation(route)}} className='routeHistory'>{route[2]} - {route[3]}</div>
                    );
                })}
            </div>
        </div>
    );
}
export default Sidebar;