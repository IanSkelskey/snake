import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import GameBoard from './components/GameBoard';

function App() {
  const [gameState, setGameState] = useState({
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    item: { x: 10, y: 10 },
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

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveTouch = moveEvent.touches[0];
        const diffX = moveTouch.clientX - startX;
        const diffY = moveTouch.clientY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            setGameState((prev) => ({ ...prev, direction: { x: 1, y: 0 } }));
          } else {
            setGameState((prev) => ({ ...prev, direction: { x: -1, y: 0 } }));
          }
        } else {
          if (diffY > 0) {
            setGameState((prev) => ({ ...prev, direction: { x: 0, y: 1 } }));
          } else {
            setGameState((prev) => ({ ...prev, direction: { x: 0, y: -1 } }));
          }
        }

        window.removeEventListener('touchmove', handleTouchMove);
      };

      window.addEventListener('touchmove', handleTouchMove);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            Snake Game
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to push the content below the AppBar */}
      <Container className="game-container">
        <GameBoard gameState={gameState} setGameState={setGameState} />
      </Container>
    </div>
  );
}

export default App;