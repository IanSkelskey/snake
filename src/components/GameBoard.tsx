import React, { useEffect, useRef } from 'react';
import Snake from './Snake';

interface GameBoardProps {
  gameState: {
    snake: { x: number; y: number }[];
    food: { x: number; y: number };
    item: { x: number; y: number };
    direction: { x: number; y: number };
    isGameOver: boolean;
  };
  setGameState: React.Dispatch<React.SetStateAction<{
    snake: { x: number; y: number }[];
    food: { x: number; y: number };
    item: { x: number; y: number };
    direction: { x: number; y: number };
    isGameOver: boolean;
  }>>;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, setGameState }) => {
  const boardRef = useRef<HTMLDivElement>(null);

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
  };

  useEffect(() => {
    if (gameState.isGameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 100);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.direction, gameState.isGameOver]);

  return (
    <div ref={boardRef} className="game-board">
      {gameState.isGameOver ? (
        <>
          <h1>Game Over</h1>
          <button onClick={resetGame}>Reset</button>
        </>
      ) : (
        <>
          <Snake snake={gameState.snake} />
          <div className="food" style={{ left: `${gameState.food.x * 20}px`, top: `${gameState.food.y * 20}px`, width: '20px', height: '20px' }} />
          <div className="item" style={{ left: `${gameState.item.x * 20}px`, top: `${gameState.item.y * 20}px`, width: '20px', height: '20px' }} />
        </>
      )}
    </div>
  );
};

export default GameBoard;