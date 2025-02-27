import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Snake from './Snake';
import BoardObject from './BoardObject';
import HUD from './HUD';
import { GameState } from '../logic/types';
import { Container } from '@mui/system';

interface GameBoardProps {
  gameState: GameState;
  boardWidth: number;
  boardHeight: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, boardWidth, boardHeight }) => {
  return (
    <Box sx={{
      maxHeight: '100%',
      aspectRatio: '1/1',
      position: 'relative',
      margin: 'auto',
      backgroundColor: 'var(--board-color)',
    }}>
      <Snake snake={gameState.snake} boardWidth={boardWidth} boardHeight={boardHeight} />
      <BoardObject type="food" position={gameState.food} boardWidth={boardWidth} boardHeight={boardHeight} />
      <BoardObject type="item" position={gameState.item} boardWidth={boardWidth} boardHeight={boardHeight} />
    </Box>
  );
};

export default GameBoard;
