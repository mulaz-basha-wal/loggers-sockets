import "./App.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("getTime", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className='App'>
      <h1>{response}</h1>
    </div>
  );
}

export default App;
