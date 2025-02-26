import React from 'react';
import { Box } from '@mui/material';
import { BoardObjectType, Position } from '../logic/types';

interface BoardObjectProps {
  type: BoardObjectType;
  position: Position;
  boardWidth: number;
  boardHeight: number;
}

const BoardObject: React.FC<BoardObjectProps> = ({ type, position, boardWidth, boardHeight }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${(position.x / boardWidth) * 100}%`,
        top: `${(position.y / boardHeight) * 100}%`,
        width: `${100 / boardWidth}%`,
        height: `${100 / boardHeight}%`,
        backgroundColor: `var(--${type}-color)`,
        borderRadius: 4,
      }}
    />
  );
};

export default BoardObject;