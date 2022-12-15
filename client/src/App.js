import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [val, setVal] = useState();
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/refresh`;
  const incURL = `${process.env.REACT_APP_API_BASE_URL}/api/increment`;
  const decURL = `${process.env.REACT_APP_API_BASE_URL}/api/decrement`;
  const resURL = `${process.env.REACT_APP_API_BASE_URL}/api/reset`;

  async function apiCall(api) {
    await fetch(api);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setVal(data.count);
    }
    fetchData();
  }, [apiURL]);

  const incHandler = () => {
    setVal(val + 1);
    apiCall(incURL);
  };

  const decHandler = () => {
    setVal(val - 1);
    apiCall(decURL);
  };

  const resHandler = () => {
    setVal(0);
    apiCall(resURL);
  };

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="wrapper">
        <button type="button" className="decBtn" onClick={() => decHandler()}>
          - Decrement
        </button>
        <h1>{val}</h1>
        <button type="button" className="incBtn" onClick={() => incHandler()}>
          + Increment
        </button>
      </div>
      <div className="wrapper">
        <button type="button" onClick={() => resHandler()}>
          RESET
        </button>
        <button type="button" onClick={() => window.location.reload()}>
          RELOAD
        </button>
      </div>
    </div>
  );
}

export default App;
