import { useState } from "react";

function MultipleRequests() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [requestTimes, setRequestTimes] = useState([]);
    
    const handleClick = async () => {
        setLoading(true);
        setRequestCount(requestCount + 1);
        const startTime = Date.now();
        try {
            const res = await fetch(
                `http://localhost:5000/api/long_request?request_id=${requestCount}`
            );
            const json = await res.json();
            setResponse(prevResponse => prevResponse.concat(json.message));
            const requestTime = Date.now() - startTime;
            setRequestTimes(prevRequestTimes =>
                prevRequestTimes.concat({ requestId: requestCount, requestTime })
            );
        } catch (error) {
            setResponse(prevResponse => prevResponse.concat(error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="MultipleRequests">
            <button onClick={handleClick}>
                {loading ? 'Loading...' : 'Long request'}
            </button>
            <p>Number of requests: {requestCount}</p>            
            <p>Request times: {requestTimes.map((requestTime, index) => (
                <li key={index}>Request {requestTime.requestId} (Time {requestTime.requestTime / 1000} s)</li>
            ))}</p>
        </div>
    );
}

export default MultipleRequests;