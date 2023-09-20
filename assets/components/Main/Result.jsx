
function Result( { resultIsShown, result} ) {
    return (
        <>
            {resultIsShown &&
            <div className='result'>
                <p>Your suggested route is:</p>
                <p>{result}</p>
            </div>
            }
        </>
    )
}

export default Result;