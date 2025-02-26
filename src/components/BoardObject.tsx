import React from 'react';
import { Box } from '@mui/material';
import { Position } from '../logic/types';

interface BoardObjectProps {
  type: 'food' | 'item';
  position: Position;
}

const BoardObject: React.FC<BoardObjectProps> = ({ type, position }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${(position.x / 20) * 100}%`,
        top: `${(position.y / 20) * 100}%`,
        width: '5%',
        height: '5%',
        backgroundColor: `var(--${type}-color)`,
        borderRadius: 4,
      }}
    />
  );
};

export default BoardObject;