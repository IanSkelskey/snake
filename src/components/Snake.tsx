import React from 'react';
import { SnakeSegment } from '../logic/types';
import { Box } from '@mui/material';
import '../styles/Snake.css';

interface SnakeProps {
  snake: SnakeSegment[];
}

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          className="snake-segment"
          sx={{
            position: 'absolute',
            left: `${(segment.x / 20) * 100}%`,
            top: `${(segment.y / 20) * 100}%`,
          }}
        />
      ))}
    </>
  );
};

export default Snake;