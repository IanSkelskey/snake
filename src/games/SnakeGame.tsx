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
  } = useSnakeGame(50, 50);

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
        minHeight: '100%',
        width: '100%',
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
          boardWidth={boardWidth}
          boardHeight={boardHeight}
        />
      )}
    </Container>
  );
}

export default SnakeGame;