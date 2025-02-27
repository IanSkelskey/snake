import React from 'react';
import { Box } from '@mui/material';
import Snake from './Snake';
import BoardObject from './BoardObject';
import HUD from './HUD';
import { GameState } from '../logic/types';
import { Container } from '@mui/system';

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
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        msFlexDirection: 'column',
        width: '100%',
        height: '100%',
      }}>
      <HUD score={score} isPaused={isPaused} onPause={onPause} onReset={onReset} />
      <Box
        sx={{
          aspectRatio: '1',
          border: '2px solid var(--border-color)',
          backgroundColor: 'var(--background-color)',
          position: 'relative',
          flexGrow: 1,
        }}
      >
        <Snake snake={snake} boardWidth={boardWidth} boardHeight={boardHeight} />
        <BoardObject type="food" position={food} boardWidth={boardWidth} boardHeight={boardHeight} />
        <BoardObject type="item" position={item} boardWidth={boardWidth} boardHeight={boardHeight} />
      </Box>
    </Container>
  );
};

export default GameBoard;