import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import Snake from './Snake';
import { GameState } from '../logic/types';

interface GameBoardProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
  boardSize?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onPause,
  onReset,
  boardSize = 400,
}) => {
  const cellSize = 20;
  const boardStyle: React.CSSProperties = {
    width: boardSize,
    height: boardSize,
    position: 'relative',
    border: '2px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
    margin: '0 auto',
  };

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

      <Box style={boardStyle}>
        {/* Snake */}
        <Snake snake={snake} cellSize={cellSize} />

        {/* Food */}
        <Box
          style={{
            position: 'absolute',
            left: food.x * cellSize,
            top: food.y * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: 'var(--food-color)',
            borderRadius: 4,
          }}
        />

        {/* Item */}
        <Box
          style={{
            position: 'absolute',
            left: item.x * cellSize,
            top: item.y * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: 'var(--item-color)',
            borderRadius: 4,
          }}
        />
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