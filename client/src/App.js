import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [val, setVal] = useState();
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/refresh`;
  const incURL = `${process.env.REACT_APP_API_BASE_URL}/api/increment`;
  const decURL = `${process.env.REACT_APP_API_BASE_URL}/api/decrement`;
  const resURL = `${process.env.REACT_APP_API_BASE_URL}/api/reset`;

  const [decr, setDecr] = useState(1);
  const [incr, setIncr] = useState(1);

  async function apiCall(api, value) {
    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: value }),
    });
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setVal(data.count);
    }
    fetchData();
  }, [apiURL]);

  const resHandler = () => {
    setVal(0);
    apiCall(resURL, 0);
  };

  const clickHandler = (num, api) => {
    setVal(val + num);
    apiCall(api, num);
  };

  const changeDecrHandler = (e) => {
    setDecr(e.target.value);
  };

  const changeIncrHandler = (e) => {
    setIncr(e.target.value);
  };

  const reloadHandler = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="wrapper">
        <div className="f-col">
          <button
            type="button"
            className="decBtn"
            onClick={() => clickHandler(-decr, decURL)}
          >
            - Decrement
          </button>
          <span>By:</span>
          <input
            type="number"
            value={decr}
            onChange={(e) => changeDecrHandler(e)}
          />
        </div>
        <h1>{val}</h1>
        <div className="f-col">
          <button
            type="button"
            className="incBtn"
            onClick={() => clickHandler(+incr, incURL)}
          >
            + Increment
          </button>
          <span>By:</span>
          <input
            type="number"
            value={incr}
            onChange={(e) => changeIncrHandler(e)}
          />
        </div>
      </div>
      <div className="wrapper">
        <button type="button" onClick={() => resHandler()}>
          RESET
        </button>
        <button type="button" onClick={() => reloadHandler()}>
          RELOAD
        </button>
      </div>
    </div>
  );
}

export default App;
