import React, { useState } from "react";
import Box from "./Box";
import './board.css'

const calculateWinner = (squares) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Board = () => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [clickedindex, setClickedindex] = useState(null);

  const handleClick = (index) => {
    if (state[index] || calculateWinner(state)) {
      return;
    }

    const newState = [...state];
    newState[index] = isX
      ? playerOne.toUpperCase().charAt(0)
      : playerTwo.toLowerCase().charAt(0);
    setState(newState);
    setIsX(!isX);
    setClickedindex(index)
  };

  const renderBoxes = () => {
    return state.map((value, index) => (
      <Box
      className={`box-container ${clickedindex === index ? 'clicked' : ''}`}
      key={index}
      onClick={() => handleClick(index)}
      value={value}
    />

    ));
  };
  const winner = calculateWinner(state);
  const status = winner
    ? `Winner: ${
        winner
          ? winner === playerOne.toUpperCase().charAt(0)
            ? playerOne
            : playerTwo
          : "Draw"
      }`
    : `Next Player: ${isX ? playerOne : playerTwo}`;

  return (
    <>
      {/* Player name inputs */}
      {isPlaying === false && (
        <>
          <h2>Let's Play</h2>
          <input
            type='text'
            value={playerOne}
            onChange={(event) => {
              setPlayerOne(event.target.value);
            }}
            placeholder='type player 1 name'
          />
          <input
            type='text'
            value={playerTwo}
            onChange={(event) => {
              setPlayerTwo(event.target.value);
            }}
            placeholder='type player 2 name'
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              if (playerOne.trim() === "" || playerTwo.trim() === "") {
                alert(`please enter the player's name`);
              } else {
                setIsPlaying((prev) => true);
              }
            }}
          >
            {isPlaying ? "Stop" : "Play"}
          </button>
        </>
      )}
      {/* Input End--- */}
      {isPlaying && (
        <div className='board-container'>
          <div className='board-row'>{renderBoxes()}</div>
          <div className='game-status'>
            <p>{status}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
