import { useState } from 'react'
import './index.css'

function Square({value, onSquareClick, isWinning}){
  const className = isWinning ? 'square-button winning-square' : 'square-button';
  return ( 
    <button 
      className={className}
      onClick = {onSquareClick}>

      {value}
          
    </button>
  );
}

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  let status;
  const draw = squares.every(square => square !== null) && !winner;

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  } 
  
  function Reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  if (winner){
    status = "Winner: " + winner;
  }
  else if (draw){
    status = "Game Over: It's a tie";
  }
  else{
    status = "Next player: " + (xIsNext ? "Player X" : "Player O")
  }

  return (
  <>
    <div className='status mb-5 '>{status}</div>
    <div className='text-10xl  flex justify-center '>
      <Square value = {squares[0]} onSquareClick = {() => handleClick(0)} isWinning={winningLine.includes(0)}/>
      <Square value = {squares[1]} onSquareClick = {() => handleClick(1)} isWinning={winningLine.includes(1)}/>
      <Square value = {squares[2]} onSquareClick = {() => handleClick(2)} isWinning={winningLine.includes(2)}/>
    </div>
    <div className = 'text-10xl flex justify-center ' >
      <Square value = {squares[3]} onSquareClick = {() => handleClick(3)} isWinning={winningLine.includes(3)}/>
      <Square value = {squares[4]} onSquareClick = {() => handleClick(4)} isWinning={winningLine.includes(4)}/>
      <Square value = {squares[5]} onSquareClick = {() => handleClick(5)} isWinning={winningLine.includes(5)}/>
    </div>
    <div className = 'text-10xl mb-5 flex justify-center '>
      <Square value = {squares[6]} onSquareClick = {() => handleClick(6)} isWinning={winningLine.includes(6)}/>
      <Square value = {squares[7]} onSquareClick = {() => handleClick(7)} isWinning={winningLine.includes(7)}/>
      <Square value = {squares[8]} onSquareClick = {() => handleClick(8)} isWinning={winningLine.includes(8)}/>
    </div>
    <div className='flex justify-center'>
      <button  
      onClick = {Reset}
      className = "reset-button">
        Start a New Game
      </button>
    </div>
  </>
  );
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return { winner: squares[a], line:[a,b,c]};
    }
  }
  return null;
}

export default Board

