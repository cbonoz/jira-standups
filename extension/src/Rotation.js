import React, { useEffect, useState, useMemo } from "react";
import ReactTimer from "@xendora/react-timer";
import { Button } from "react-bootstrap";

import { groupIssues, sampleIssues, sortRandom, getJira } from "./helper";
import Issue from "./Issue";
import TimeText from "./TimeText";

function Rotation({ board, setBoard }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [issues, setIssues] = useState(groupIssues(sampleIssues()));
  const [users, setUsers] = useState(sortRandom(Object.keys(issues)) || []);
  const [duration, setDuration] = useState(15); // 15 minutes (adjustable)
  const [timesUp, setTimesUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ended, setEnded] = useState(false);
  const [started, setStarted] = useState(false);

  async function getIssues() {
    setLoading(true);
    try {
      const data = await getJira().board.getIssuesForBoard({
        boardId: board.id,
      });
      const newIssues = groupIssues(data.issues);
      setIssues(newIssues);
      setUsers(Object.keys(newIssues));
    } catch (e) {
      // alert("Error getting issues for board", e.toString());
      console.error(e);
    }
    setLoading(false);
  }

  const maxTime = useMemo(() => {
    return parseInt((duration * 60) / users.length);
  }, [users, duration]);

  const next = () => {
    setTimesUp(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= users.length) {
      setEnded(new Date());
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const RenderStandupUser = () => {
    const currentUser =
      users.length >= currentIndex ? users[currentIndex] : null;
    if (!currentUser) {
      return <p>User not found</p>;
    }

    const currentIssues = issues[currentUser];

    return (
      <div>
        <div className="centered">
          <ReactTimer
            // interval={1}
            start={maxTime}
            end={(t) => parseInt(t) === 0}
            onEnd={() => setTimesUp(true)}
            onTick={(t) => t - 1}
          >
            {(time) => <TimeText time={time} />}
          </ReactTimer>

          {timesUp && <div className="times-up">Times Up!</div>}
          <br />

          {currentUser && <h4>{currentUser}</h4>}
        </div>
        <hr />

        <div>
          <p>Issues to discuss:</p>
          {currentIssues.map((iss, i) => {
            return (
              <div key={i}>
                <Issue issue={iss} />
              </div>
            );
          })}
          {!currentIssues && <p>No active issues</p>}
        </div>

        <Button onClick={next}>Next</Button>
      </div>
    );
  };

  const startOver = () => setBoard(null);

  return (
    <div>
      <div>
        {started && !ended && <RenderStandupUser />}
        {ended && (
          <div>
            <h1>Standup Complete</h1>
            <p>
              Time: <TimeText showTime time={(ended - started) / 1000} />
            </p>
            <div className="home-button">
              <Button onClick={startOver}>Back to Home</Button>
            </div>
          </div>
        )}
        {!started && users && (
          <div>
            <p>
              About to a start a Standup for {board.name}.<br />
              The following individuals will be called:
            </p>
            {users.map((u, i) => {
              return (
                <h5 className="user-list-item" key={i}>
                  {u}
                </h5>
              );
            })}
            <br />
            <p>
              Enter desired duration (minutes):&nbsp;
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                type="number"
              />
            </p>

            <br />
            <br />
            <Button size="lg" onClick={() => setStarted(new Date())}>
              Start
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rotation;
