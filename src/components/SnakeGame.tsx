import React, { useState, useEffect, useRef } from 'react';
import { Container, useTheme, Typography, Button } from '@mui/material';
import GameBoard from './GameBoard';
import MainMenu from './MainMenu';
import '../styles/SnakeGame.css'; // Import the new CSS file

function SnakeGame() {
  const theme = useTheme();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [gameState, setGameState] = useState({
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    item: { x: 10, y: 10 },
    direction: { x: 1, y: 0 },
    isGameOver: false,
  });

  const boardRef = useRef<HTMLDivElement>(null);
  const virtualResolution = 400; // Set the virtual resolution
  const lastTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const frameDuration = 100; // Duration of each frame in milliseconds

  const moveSnake = () => {
    setGameState(prevState => {
      const newSnake = [...prevState.snake];
      const head = { x: newSnake[0].x + prevState.direction.x, y: newSnake[0].y + prevState.direction.y };
      newSnake.unshift(head);

      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        placeFood();
      } else if (head.x === prevState.item.x && head.y === prevState.item.y) {
        placeItem();
      } else {
        newSnake.pop();
      }

      if (checkCollision(head, newSnake)) {
        return { ...prevState, isGameOver: true };
      }

      return { ...prevState, snake: newSnake };
    });
  };

  const checkCollision = (head: { x: number; y: number }, snake: { x: number; y: number }[]) => {
    return (
      head.x < 0 ||
      head.x >= 20 ||
      head.y < 0 ||
      head.y >= 20 ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  };

  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
    setGameState(prevState => ({ ...prevState, food: newFood }));
  };

  const placeItem = () => {
    const newItem = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
    setGameState(prevState => ({ ...prevState, item: newItem }));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setGameState(prevState => ({ ...prevState, direction: { x: 0, y: -1 } }));
        break;
      case 'ArrowDown':
        setGameState(prevState => ({ ...prevState, direction: { x: 0, y: 1 } }));
        break;
      case 'ArrowLeft':
        setGameState(prevState => ({ ...prevState, direction: { x: -1, y: 0 } }));
        break;
      case 'ArrowRight':
        setGameState(prevState => ({ ...prevState, direction: { x: 1, y: 0 } }));
        break;
    }
  };

  const resetGame = () => {
    setGameState({
      snake: [{ x: 0, y: 0 }],
      food: { x: 5, y: 5 },
      item: { x: 10, y: 10 },
      direction: { x: 1, y: 0 },
      isGameOver: false,
    });
    setIsGameStarted(false);
  };

  const gameLoop = (currentTime: number) => {
    if (gameState.isGameOver) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    accumulatedTimeRef.current += deltaTime;

    while (accumulatedTimeRef.current >= frameDuration) {
      moveSnake();
      accumulatedTimeRef.current -= frameDuration;
    }

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    lastTimeRef.current = performance.now();
    requestAnimationFrame(gameLoop);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.direction, gameState.isGameOver]);

  useEffect(() => {
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

    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

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
      {isGameStarted ? (
        gameState.isGameOver ? (
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Game Over
            </Typography>
            <Button variant="contained" color="primary" onClick={resetGame}>
              Reset Game
            </Button>
          </Container>
        ) : (
          <GameBoard
            gameState={gameState}
            boardRef={boardRef}
            virtualResolution={virtualResolution}
            resetGame={resetGame}
          />
        )
      ) : (
        <MainMenu onStart={handleStartGame} />
      )}
    </Container>
  );
}

export default SnakeGame;