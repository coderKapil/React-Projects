import { useState } from "react";
import Card from "../Card/card";
import "./grid.css";
import isWinner from "../../helpers/checkWinners";

function Grid({ noOfCards }) {
  const [board, setboard] = useState(Array(noOfCards).fill(""));
  const [turn, setturn] = useState(true); //true => O : false = > X
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
    setwinner(null);
    setboard(Array(noOfCards).fill(""));
  }
  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
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
            onPlay={play}
            player={ele}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
