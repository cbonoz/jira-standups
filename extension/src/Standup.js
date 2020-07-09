import React, { useEffect, useState } from "react";
import axios from "axios";
import Rotation from "./Rotation";
import { Button } from "react-bootstrap";
import { getJira } from "./helper";

function Standup({ credentials }) {
  const { domain, token } = credentials;
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBoards() {
      setError("");
      setLoading(true);
      try {
        const data = await getJira().board.getAllBoards();
        if (!data) {
          setError(`Please use extension while on your Jira page: ${domain}`);
          return;
        }
        const userBoards = data.values;
        console.log("boards", data);
        setBoards(userBoards);
      } catch (e) {
        // setError(e.toString());
        console.error(e);
        setError("Error loading boards, please try again later");
      }
      setLoading(false);
    }
    getBoards();
  }, []);

  return (
    <div>
      {!selectedBoard && (
        <div>
          <p>Ready for Standup?</p>
          <h3>Select board:</h3>
          <br />
          {loading && <p>...</p>}
          {boards &&
            boards.map((b, i) => {
              return (
                <div key={i}>
                  <Button
                    size="lg"
                    variant="info"
                    onClick={() => setSelectedBoard(b)}
                  >
                    {b.name}
                  </Button>
                  <br />
                </div>
              );
            })}
          {error && <p className="error-text">{error}</p>}
        </div>
      )}

      {selectedBoard && (
        <Rotation
          board={selectedBoard}
          setBoard={setSelectedBoard}
          domain={domain}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Standup;
