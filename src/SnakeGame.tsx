import React, { useState, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import { useSnakeGame } from './hooks/useSnakeGame';
import { useControls } from './logic/controls';

function SnakeGame() {
  const [isStarted, setIsStarted] = useState(false);

  const {
    gameState,
    setDirection,
    togglePause,
    resetGame,
  } = useSnakeGame(20, 20);

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        '--border-color': (theme) => theme.palette.divider,
        '--background-color': (theme) => theme.palette.background.default,
        '--snake-color': (theme) => theme.palette.success.main,
        '--food-color': (theme) => theme.palette.error.main,
        '--item-color': (theme) => theme.palette.info.main,
        minHeight: '100vh',
        width: '100%',
        padding: 2,
      }}
    >
      {!isStarted ? (
        <MainMenu onStart={handleStart} />
      ) : gameState.isGameOver ? (
        <GameOver score={gameState.score} onReset={handleReset} />
      ) : (
        <GameBoard
          gameState={gameState}
          onPause={togglePause}
          onReset={handleReset}
        />
      )}
    </Container>
  );
}

export default SnakeGame;