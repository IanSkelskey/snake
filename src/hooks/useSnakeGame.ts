import { useState, useRef, useEffect } from 'react';
import { Position, GameState } from '../logic/types';

export function useSnakeGame(boardWidth = 20, boardHeight = 20) {
  const frameDuration = 150; // ms per movement update
  const lastTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    item: { x: 10, y: 10 },
    direction: { x: 1, y: 0 },
    score: 0,
    isPaused: false,
    isGameOver: false,
  });

  // Helper to place new random food or item
  const getRandomPosition = (): Position => ({
    x: Math.floor(Math.random() * boardWidth),
    y: Math.floor(Math.random() * boardHeight),
  });

  const moveSnake = () => {
    setGameState(prev => {
      const newSnake = [...prev.snake];
      const head = { 
        x: newSnake[0].x + prev.direction.x, 
        y: newSnake[0].y + prev.direction.y 
      };

      // Insert new head
      newSnake.unshift(head);

      // Check if we ate food
      let newScore = prev.score;
      let newFood = prev.food;
      let newItem = prev.item;

      if (head.x === prev.food.x && head.y === prev.food.y) {
        // Increase score by 1 for food
        newScore += 1;
        newFood = getRandomPosition();
      } else if (head.x === prev.item.x && head.y === prev.item.y) {
        // Increase score by 5 for item
        newScore += 5;
        newItem = getRandomPosition();
      } else {
        // Otherwise pop tail
        newSnake.pop();
      }

      // Check collision with walls or self
      if (
        head.x < 0 || 
        head.x >= boardWidth || 
        head.y < 0 || 
        head.y >= boardHeight ||
        newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        return { 
          ...prev,
          isGameOver: true,
        };
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        item: newItem,
        score: newScore,
      };
    });
  };

  // Start or continue the game loop via requestAnimationFrame
  const gameLoop = (currentTime: number) => {
    if (gameState.isPaused || gameState.isGameOver) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    accumulatedTimeRef.current += deltaTime;

    while (accumulatedTimeRef.current >= frameDuration) {
      moveSnake();
      accumulatedTimeRef.current -= frameDuration;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // Public API methods
  const setDirection = (dir: Position) => {
    setGameState(prev => {
      // Prevent 180° reversal in a single move
      if (prev.direction.x + dir.x === 0 && prev.direction.y + dir.y === 0) {
        return prev; // ignore reversal
      }
      return { ...prev, direction: dir };
    });
  };

  const togglePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const resetGame = () => {
    setGameState({
      snake: [{ x: 0, y: 0 }],
      food: getRandomPosition(),
      item: getRandomPosition(),
      direction: { x: 1, y: 0 },
      score: 0,
      isPaused: false,
      isGameOver: false,
    });
  };

  // Manage the game loop
  useEffect(() => {
    lastTimeRef.current = performance.now();
    accumulatedTimeRef.current = 0;
    if (!gameState.isPaused && !gameState.isGameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isPaused, gameState.isGameOver, gameState.direction]);

  return {
    gameState,
    setDirection,
    togglePause,
    resetGame,
  };
}
