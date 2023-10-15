
function Legend() {
    return (
        <div className='legend'>
            <div className='legendCat publicLegend'>
                <div className='color publicColor'></div>
                <p> - Public transport</p>
            </div>
            <div className='legendCat ridesharingLegend'>
                <div className='color ridesharingColor'></div>
                <p> - Ridesharing</p>
            </div>
            <div className='legendCat alternativeLegend'>
                <div className='color alternativeColor'></div>
                <p> - Alternative route(s)</p>
            </div>
        </div>
    );
}
export default Legend;