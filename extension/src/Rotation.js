import React, { useEffect, useState } from "react";
import ReactTimer from "@xendora/react-timer";

import axios from "axios";
import { getColorForAge } from "./helper";

const MAX_TIME = 90;

function Rotation({ credentials, board }) {
  const { token, domain } = credentials;
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIssues, setCurrentIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [started, setStarted] = useState(false);

  async function getIssues() {
    const url = `${domain}/rest/agile/1.0/board/${board.id}/issue`;
    try {
      const data = await axios.get(url);
    } catch (e) {
      console.error(e);
    }
  }

  const next = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= users.length) {
      setComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  async function getUsers() {
    const url = "";
    try {
      const data = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const RenderStandupUser = () => {
    const currentUser =
      users.length >= currentIndex ? users[currentIndex] : null;
    if (!currentUser) {
      return <p>User not found</p>;
    }
    return (
      <div>
        <ReactTimer
          interval={MAX_TIME}
          start={0}
          end={(t) => t === MAX_TIME}
          onTick={(t) => t + 1}
        >
          {(time) => <span className="jira-timer">{time}</span>}
        </ReactTimer>

        {currentUser && <p>{currentUser.name}</p>}
        <hr />

        <div>
          {currentIssues.map((iss, i) => {
            const issueAge = iss.age || 0; // TODO: check actual value
            const colorClass = getColorForAge(issueAge);
            return (
              <div>
                {{ iss }}
                <p class={colorClass}>Issue is {issueAge} days old.</p>
              </div>
            );
          })}
        </div>

        <button onClick={next}>Next</button>
      </div>
    );
  };

  return (
    <div>
      <div>
        {started && <RenderStandupUser />}
        {complete && (
          <div>
            <h1>Standup Complete</h1>
          </div>
        )}
        <button onClick={() => setStarted(true)}>Start</button>
      </div>
    </div>
  );
}

export default Rotation;
