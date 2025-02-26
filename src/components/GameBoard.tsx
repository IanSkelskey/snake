import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Snake from './Snake';
import BoardObject from './BoardObject';
import { GameState } from '../logic/types';

interface GameBoardProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onPause, onReset }) => {
  const { snake, food, item, score, isPaused } = gameState;

  return (
    <Box textAlign="center">
      <Box mb={2}>
        <Typography variant="h6">
          <strong>Score:</strong> {score}{" "}
          <span style={{ marginLeft: '1rem' }}>
            <strong>Paused:</strong> {isPaused ? 'Yes' : 'No'}
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          maxWidth: 'calc(100vh - 96px)',
          aspectRatio: '1',
          border: '2px solid var(--border-color)',
          backgroundColor: 'var(--background-color)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Snake snake={snake} />

        <BoardObject type="food" position={food} />
        <BoardObject type="item" position={item} />
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onPause} sx={{ mr: 1 }}>
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default GameBoard;