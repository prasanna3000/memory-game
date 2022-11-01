import { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";

import "./Game.css";
const Game = (props) => {
  const boardRef = useRef(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [selectedCells, setSelectedCells] = useState(null);

  const {
    levels, color,
    currentLevel,
    lives,
    setLives,
    isGameOver,
    gridSize,
    setIsGameOver,
    selectedCellsForCurrentLevel,
    guessesToWin,
    setGuessesToWin,
    setCurrentLevel,
    setGridSize,
  } = props;

  useEffect(() => {
    boardRef.current.style.setProperty("--grid-size", gridSize);
  }, [gridSize]);

  const onGridClick  = (selectedCellNumber) => {
    if(lives === 0) {
      setInfoMessage('Click on Restart to start a new Game!!');
    }
    if(selectedCellsForCurrentLevel[selectedCellNumber] === 1) {
      const oldSelectedCells = Object.assign({}, selectedCells);
      if(!oldSelectedCells[selectedCellNumber]) {
        oldSelectedCells[selectedCellNumber] = 1;
        setSelectedCells(oldSelectedCells);
        setGuessesToWin(guessesToWin - 1);
      } else {
        setInfoMessage('Cell already selected');
        setTimeout(() => {
          setInfoMessage(null);
        }, [2000])
      }   
    } else {
        setLives(lives - 1);
    }
  }
  useEffect(() => {
    if(lives === 0) {
      setIsGameOver(true);
      setInfoMessage('You lost the game, better luck next time')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives])

  useEffect(() => {
    if(guessesToWin === 0) {
      setInfoMessage(`Level : ${currentLevel} Done!! Wait till the next level Loads...`);
      setTimeout(() => {
        if(currentLevel + 1 <= levels) {
          setCurrentLevel(currentLevel + 1);
          setGridSize(gridSize + 1);
          setSelectedCells(null);
          setInfoMessage(null);
        }
        else {
          setIsGameOver(true);
          setInfoMessage('GAME OVER !! Congratulations, YOU WON');
        }
      }, [5000]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessesToWin])

  const createSquares = () => {
    console.log('createSquares', selectedCellsForCurrentLevel);
    let html = [];
    for (let i = 1; i <= gridSize * gridSize; i++) {
      html.push(<div key={i} onClick={() => onGridClick(i)} className={selectedCellsForCurrentLevel[i] === 1 ? `square color${color}` : 'square white'}></div>);
    }
    setTimeout(() => {
      const squares = document.getElementsByClassName('square');
      for(let iter = 0; iter <squares.length; iter++) {
        const tag = squares[iter];
        tag.classList.remove(`color${color}`);
        tag.classList.add(`white`);
      }
    }, [5000]);
    return html;
  };
  return (
    <div className="parentBoard">
      <div className="score">
        <img src={logo} alt="logo" className="logoImage" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <p>🏆 Total Levels : {levels} </p>
          <p>⌛ Current Level: {currentLevel} </p>
          <p>❤️ Lives remaining: {lives}</p>
        </div>
        <p>{infoMessage}</p>
        {isGameOver ? <button onClick={() => window.location.reload()}>Restart</button> : null}
      </div>
      <div className="game">
        <div className="board" ref={boardRef}>
          {createSquares()}
        </div>
      </div>
    </div>
  );
};

export default Game;
