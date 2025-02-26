import React, { useState, useEffect } from 'react';
import { Container, useTheme } from '@mui/material';
import GameBoard from './GameBoard';
import '../styles/SnakeGame.css'; // Import the new CSS file

function SnakeGame() {
  const theme = useTheme();

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
    <Container
      className="game-container"
      style={{
        '--border-color': theme.palette.divider,
        '--background-color': theme.palette.background.default,
        '--snake-color': theme.palette.success.main,
        '--food-color': theme.palette.error.main,
        '--item-color': theme.palette.info.main,
      } as React.CSSProperties}
    >
      <GameBoard gameState={gameState} setGameState={setGameState} />
    </Container>
  );
}

export default SnakeGame;