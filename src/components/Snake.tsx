import React from 'react';
import { SnakeSegment } from '../logic/types';
import { Box } from '@mui/material';

interface SnakeProps {
  snake: SnakeSegment[];
  boardWidth: number;
  boardHeight: number;
}

const Snake: React.FC<SnakeProps> = ({ snake, boardWidth, boardHeight }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          className="snake-segment"
          sx={{
            position: 'absolute',
            left: `${(segment.x / boardWidth) * 100}%`,
            top: `${(segment.y / boardHeight) * 100}%`,
            width: `${100 / boardWidth}%`,
            height: `${100 / boardHeight}%`,
            backgroundColor: `var(--snake-color)`,
          }}
        />
      ))}
    </>
  );
};

export default Snake;