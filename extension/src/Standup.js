import React, { useEffect, useState } from "react";
import axios from "axios";
import Rotation from "./Rotation";
import { Button } from "react-bootstrap";
import { getJira } from "./helper";

function Standup({ credentials }) {
  const { domain, token } = credentials;
  const [boards, setBoards] = useState([
    {
      id: 1,
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/board/1",
      name: "GROW board",
      type: "scrum",
      location: [Object],
    },
  ]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getBoards() {
    setLoading(true);
    try {
      const data = await getJira().board.getAllBoards();
      const userBoards = data.values;
      console.log("boards", userBoards);
      setBoards(userBoards);
    } catch (e) {
      // setError(e.toString());
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div>
      {!selectedBoard && (
        <div>
          <h3>Select Board:</h3>
          <br />
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
        </div>
      )}

      {selectedBoard && (
        <Rotation board={selectedBoard} setBoard={setSelectedBoard} />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Standup;
