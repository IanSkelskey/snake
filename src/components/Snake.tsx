import React from 'react';
import { SnakeSegment } from '../logic/types';
import { Box } from '@mui/material';

interface SnakeProps {
  snake: SnakeSegment[];
}

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${(segment.x / 20) * 100}%`,
            top: `${(segment.y / 20) * 100}%`,
            width: '5%',
            height: '5%',
            backgroundColor: 'var(--snake-color)',
            borderRadius: 4,
          }}
        />
      ))}
    </>
  );
};

export default Snake;