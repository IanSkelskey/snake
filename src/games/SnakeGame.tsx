import React, { useState, useCallback } from 'react';
import { Container } from '@mui/material';
import MainMenu from '../components/MainMenu';
import GameBoard from '../components/GameBoard';
import GameOver from '../components/GameOver';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { useControls } from '../logic/controls';

function SnakeGame() {
  const [isStarted, setIsStarted] = useState(false);

  const {
    gameState,
    setDirection,
    togglePause,
    resetGame,
    boardWidth,
    boardHeight,
  } = useSnakeGame(30, 30);

  // Hook up controls
  useControls({
    onDirectionChange: setDirection,
    onTogglePause: togglePause,
  });

  const handleStart = useCallback(() => {
    setIsStarted(true);
  }, []);

  const handleReset = useCallback(() => {
    resetGame();
    setIsStarted(false);
  }, [resetGame]);

  return (
    <Container
      sx={(theme) => ({
      '--border-color': theme.palette.divider,
      '--background-color': theme.palette.background.default,
      '--snake-color': theme.palette.success.main,
      '--food-color': theme.palette.error.main,
      '--item-color': theme.palette.info.main,
      '--board-color': theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300],
      })}
    >
      {!isStarted ? (
      <MainMenu onStart={handleStart} />
      ) : gameState.isGameOver ? (
      <GameOver score={gameState.score} onReset={handleReset} />
      ) : (
      <GameBoard
        gameState={gameState}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
      />
      )}
    </Container>
  );
}

export default SnakeGame;