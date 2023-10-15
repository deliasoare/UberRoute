
function ErrorMsg({closeErrorMsg}) {
    return (
        <div className='errorMsg'>
            <div onClick={closeErrorMsg} className='closeMsg'>X</div>
            <p>The route you requested couldn't be computed.</p>
        </div>
    );
}
export default ErrorMsg;