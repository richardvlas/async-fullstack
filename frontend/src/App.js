import { useState } from 'react';

import MultipleRequests from './components/MultipleRequests';


function App() {
  const [loadingShort, setLoadingShort] = useState(false);
  const [loadingLong, setLoadingLong] = useState(false);
  const [response, setResponse] = useState(null);

  async function handleShortRequestButtonClick() {
    setLoadingShort(true);
    try {
      const res = await fetch('http://localhost:5000/api/short_request');
      console.log(res)
      const json = await res.json();
      setResponse(json.message);
    } catch (error) {
      setResponse(error.message);
    } finally {
      setLoadingShort(false);
    }
  }

  async function handleLongProcessButtonClick() {
    setLoadingLong(true);
    try {
      const res = await fetch('http://localhost:5000/api/long_request');
      const json = await res.json();
      setResponse(json.message);
    } catch (error) {
      setResponse(error.message);
    } finally {
      setLoadingLong(false);
    }
  }

  
  return (
    <div className="App">
      <h1>Synchronous Backend</h1>
      <p>
        This fullstack app finally helped me understand that calling Flask a synchronous backend is a bit misleading.
        By default, Flask is a synchronous backend, but it can be configured to run concurrently.
        In a Flask backend, each request is handled in a separate thread, and the server does not block or wait for other requests to be completed before handling a new request. This means that if you make a long-running request and then make a short request, the server will create a separate thread for each request and process them concurrently. The long-running request will not block the short request from being completed, and the short request will not block the long-running request from being completed.
      </p>
      <p>
        In the example below, both requests are handled concurrently by the backend. 
        Try to make a long request and then make a short request. The short request
        will be completed before the long request is completed, showing that the
        backend is able to handle multiple requests concurrently.
      </p>

      <button disabled={loadingShort} onClick={handleShortRequestButtonClick}>
        {loadingShort ? 'Loading...' : 'Short request'}
      </button>
      <button disabled={loadingLong} onClick={handleLongProcessButtonClick}>
        {loadingLong ? 'Loading...' : 'Long request'}
      </button>
      
      {response ? <p>{response}</p> : null}
      

      <h1>Simultaneous Requests</h1>
      <p>
        When you make simultaneous requests to the backend, the requests are 
        likely being processed concurrently by the backend, rather than sequentially. 
        This is because the Flask development server uses the Werkzeug WSGI server, 
        which runs in a single process and uses multiple threads to handle incoming 
        requests concurrently.
        <br />
        This means that when you make multiple requests to the backend at the same time, 
        the backend can process them concurrently, and the total time it takes to 
        complete all the requests may be shorter than the sum of the processing times for each request.
      </p>
      <p>
        In the example below, you can see that when you make multiple requests to the backend, 
        the total time it takes to complete all the requests is shorter than the sum of the
        processing times for each request.
      </p>
      <p>
        The button can be clicked multiple times to make multiple requests to the backend 
        eventhough the previous requests are still being processed. Notice that the responses
        are returned in random order, as the backend is able to process the requests concurrently
        and each process (time.sleep random length) is independent of the other processes:
      </p>
      <MultipleRequests />


      <h1>Asynchronous Backend</h1>
      <p>
        In the context of a web server handling incoming requests, "concurrently" refers to the server's ability to handle multiple requests at the same time, while "asynchronously" refers to the way in which the server handles a single request.
      </p>
      <p>
        When a web server processes requests concurrently, it means that it can handle multiple requests simultaneously, by using multiple threads or processes. This allows the server to serve multiple requests more efficiently, by utilizing the full capacity of the server's hardware.
      </p>
      <p>
        On the other hand, when a web server handles a single request asynchronously, it means that it can perform other tasks while waiting for a response from the client or a slow external resource. This allows the server to serve multiple requests more efficiently, by not being blocked by slow or long-running tasks.
      </p>
      <p>
        So, while "concurrently" and "asynchronously" are related concepts, they are not the same thing. A server can handle requests concurrently, asynchronously, or both concurrently and asynchronously.
      </p>
      <p>
        FastAPI, like other asyncio-based web frameworks, uses a single event loop to handle incoming requests asynchronously. An event loop is a control structure that waits for and dispatches events or messages in a program.
      </p>
      <p>
        In the case of an asyncio-based web framework like FastAPI, the event loop waits for incoming HTTP requests, and dispatches them to the appropriate request handler. The request handler then performs the required tasks asynchronously, using the async keyword and the await operator to asynchronously wait for external resources or slow operations to complete.
      </p>
      <p>
        This means that FastAPI uses a single thread to handle incoming requests asynchronously, rather than using multiple threads like a traditional synchronous web framework would.
      </p>

    </div>
  );
}

export default App;
