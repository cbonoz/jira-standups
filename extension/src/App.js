/*global chrome*/

import React, { useState, useEffect } from "react";
import "./App.css";
import Standup from "./Standup";
import { Button } from "react-bootstrap";
import { initJira } from "./helper";
import "bootstrap/dist/css/bootstrap.min.css";

// import logo from "./../src/logo.png";
const logo = "https://i.ibb.co/P15Qr2R/logo.png";

function App(props) {
  const [credentials, setCredentials] = useState(
    JSON.parse(localStorage.getItem("jira_standups")) || {}
  );
  const [token, setToken] = useState(credentials.token);
  const [domain, setDomain] = useState(credentials.domain);
  const [email, setEmail] = useState(credentials.email);

  const [tokenValid, setTokenValid] = useState(false);

  const saveCredentials = () => {
    const processedDomain = domain.replace("https://", "");
    const v = { token, domain: processedDomain, email };
    setCredentials(v);
    localStorage.setItem("jira_standups", JSON.stringify(v));
    initJira(v);
    setTokenValid(true); // TODO: add verification based off token api call.
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1 className="App-title">Jira Standups</h1>
      </header>

      <div className="App-intro">
        <p className="slogan-text">A managed way to do standups.</p>
        {!tokenValid && (
          <div>
            <p>Enter your Jira credentials to get started.</p>
            <h5>Jira Host:</h5>
            <input onChange={(e) => setDomain(e.target.value)} value={domain} />
            <br />
            <h5>Email:</h5>
            <input onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <h5>Token:</h5>
            <input
              onChange={(e) => setToken(e.target.value)}
              type="password"
              value={token}
            />
            <br />
            <div className="credentials-button">
              <Button
                disabled={!token || !domain || !email}
                onClick={saveCredentials}
                variant="success"
                size="lg"
              >
                Save Credentials
              </Button>
            </div>
          </div>
        )}

        {tokenValid && <Standup credentials={credentials} />}
      </div>
    </div>
  );
}

export default App;
