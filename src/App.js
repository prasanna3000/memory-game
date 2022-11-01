import './App.css';
import { useEffect, useState } from "react";
import Game from './components/Game';
import {
  colors,
  defaultLives,
  defaultLevels,
  initialGridSize,
} from './config/globalConfig';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [levels, setLevels] = useState(defaultLevels);
  const [lives, setLives] = useState(defaultLives);
  const [guessesToWin, setGuessesToWin] = useState(10000);
  const [color, setColor] = useState('yellow');
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [selectedCellsForCurrentLevel, setSelectedCellsForCurrentLevel] = useState({});

  useEffect(() => {
    setLevels(Math.floor(Math.random() * defaultLevels + 1));
  }, []);

  useEffect(() => {
      const tempSelectedCells = {};
      const upperLimit = gridSize * gridSize;
      let countOfOnes = 0;
      for(let level = 1; level <= upperLimit; level++) {
        const randomNumber = Math.round(Math.random());
        if(countOfOnes >= currentLevel) break;
        if(randomNumber === 1) countOfOnes++;
        tempSelectedCells[level] = randomNumber;
      }
      setGuessesToWin(countOfOnes);
      // console.log(tempSelectedCells);
      setSelectedCellsForCurrentLevel(tempSelectedCells);
      setColor(getColor());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);

  const getColor = () => {
    return Math.floor(Math.random() * colors.length + 1);
  }

  return (
    <div className="App">
      <Game 
        levels={levels}
        color={color}
        lives={lives}
        gridSize={gridSize}
        setGridSize={setGridSize}
        guessesToWin = {guessesToWin}
        setGuessesToWin={setGuessesToWin}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        setLives={setLives}
        selectedCellsForCurrentLevel = {selectedCellsForCurrentLevel}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
    </div>
  );
}

export default App;
