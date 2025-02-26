import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Snake from './Snake';
import BoardObject from './BoardObject';
import { GameState } from '../logic/types';

interface GameBoardProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
  boardWidth: number;
  boardHeight: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onPause, onReset, boardWidth, boardHeight }) => {
  const { snake, food, item, score, isPaused } = gameState;

  return (
    <Box textAlign="center" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
          maxWidth: '600px', // Limit the maximum width for large screens
          aspectRatio: `${boardWidth} / ${boardHeight}`,
          border: '2px solid var(--border-color)',
          backgroundColor: 'var(--background-color)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Snake snake={snake} boardWidth={boardWidth} boardHeight={boardHeight} />
        <BoardObject type="food" position={food} boardWidth={boardWidth} boardHeight={boardHeight} />
        <BoardObject type="item" position={item} boardWidth={boardWidth} boardHeight={boardHeight} />
      </Box>

      <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={onPause}>
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