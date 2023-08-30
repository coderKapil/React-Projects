import { useState } from "react";
import Card from "../Cards/Cards";
import "./grid.css";
import isWinner from "../helper/winner";

function Grid({ numberOfCards }) {
  const [board, setboard] = useState(Array(numberOfCards).fill(""));
  const [turn, setturn] = useState(true); //true ? O : X
  const [winner, setwinner] = useState(null);

  function play(index) {
    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }

    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setwinner(win);
    }

    setboard([...board]);
    setturn(!turn);
  }

  function reset() {
    setturn(true);
    setboard(Array(numberOfCards).fill(""));
    setwinner(null);
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is : {winner}</h1>
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"}</h1>
      <div className="grid">
        {board.map((ele, idx) => (
          <Card
            gameEnd={winner ? true : false}
            key={idx}
            player={ele}
            onPlay={play}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
