import React, { useEffect, useState } from "react";
import axios from "axios";
import Rotation from "./Rotation";

function Standup({ credentials }) {
  const { domain, token } = credentials;
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getBoards() {
    setLoading(true);
    const url = `${domain}/rest/agile/1.0/board`;
    try {
      const data = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
      const userBoards = data.values;
      console.log("boards", userBoards);
      setBoards(userBoards);
    } catch (e) {
      setError(e);
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
          {boards &&
            boards.map((b, i) => {
              return (
                <div>
                  <button onClick={() => setSelectedBoard(b)}>
                    {JSON.stringify(b)}
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {selectedBoard && (
        <Rotation board={selectedBoard} credentials={credentials} />
      )}

      {error && <p class="error-text">{error}</p>}
    </div>
  );
}

export default Standup;
