/*global chrome*/

import React, { useState, useEffect } from "react";
import logo from "./jira_standups.png";
import "./App.css";
import Standup from "./Standup";

function App(props) {
  const [credentials, setCredentials] = useState(
    JSON.parse(localStorage.getItem("jira_standups")) || {}
  );
  const [token, setToken] = useState(credentials.token);
  const [domain, setDomain] = useState(credentials.domain);
  const [tokenValid, setTokenValid] = useState(false);


  const saveCredentials = () => {
    const v = { token, domain };
    setCredentials(v);
    localStorage.setItem("jira_standups", JSON.stringify(v));
    setTokenValid(true); // TODO: add verification based off token api call.
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1 className="App-title">Jira Standups</h1>
      </header>

      <p className="App-intro">
        {domain && <p>{domain}</p>}
        {!tokenValid && (
          <div>
            <p>Enter your Jira credentials to get started.</p>
            <h4>Domain:</h4>
            <input onChange={(e) => setDomain(e.target.value)} value={domain} />
            <p>Token:</p>
            <input onChange={(e) => setToken(e.target.value)} value={token} />
            <br />
            <div class="credentials-button">
              <button disabled={!token || !domain} onClick={saveCredentials}>
                Save Credentials
              </button>
            </div>
          </div>
        )}

        {tokenValid && <Standup credentials={credentials} />}
      </p>
    </div>
  );
}

export default App;
