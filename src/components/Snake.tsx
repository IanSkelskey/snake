import React from 'react';
import { SnakeSegment } from '../logic/types';

interface SnakeProps {
  snake: SnakeSegment[];
  cellSize?: number; // Adjust if you want different rendering
}

const Snake: React.FC<SnakeProps> = ({ snake, cellSize = 20 }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: 'var(--snake-color)',
            borderRadius: 4,
          }}
        />
      ))}
    </>
  );
};

export default Snake;
