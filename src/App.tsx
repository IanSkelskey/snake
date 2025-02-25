import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [gameState, setGameState] = useState({
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    item: { x: 10, y: 10 }, // Add item state
    direction: { x: 1, y: 0 },
    isGameOver: false,
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setGameState((prev) => ({ ...prev, direction: { x: 0, y: -1 } }));
          break;
        case 'ArrowDown':
          setGameState((prev) => ({ ...prev, direction: { x: 0, y: 1 } }));
          break;
        case 'ArrowLeft':
          setGameState((prev) => ({ ...prev, direction: { x: -1, y: 0 } }));
          break;
        case 'ArrowRight':
          setGameState((prev) => ({ ...prev, direction: { x: 1, y: 0 } }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <GameBoard gameState={gameState} setGameState={setGameState} />
    </div>
  );
}

export default App;