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
      {snake.map((segment, index) => {
        let borderRadius = '0%';
        if (index === 0) {
          // Head of the snake
          const nextSegment = snake[index + 1];
          if (nextSegment) {
            if (segment.x < nextSegment.x) {
              borderRadius = `50% 0% 0% 50%`; // Facing right
            } else if (segment.x > nextSegment.x) {
              borderRadius = `0% 50% 50% 0%`; // Facing left
            } else if (segment.y < nextSegment.y) {
              borderRadius = `50% 50% 0% 0%`; // Facing down
            } else if (segment.y > nextSegment.y) {
              borderRadius = `0% 0% 50% 50%`; // Facing up
            }
          }
        } else if (index === snake.length - 1) {
          // Tail of the snake
          const prevSegment = snake[index - 1];
          if (prevSegment) {
            if (segment.x < prevSegment.x) {
              borderRadius = `50% 0% 0% 50%`; // Facing left
            } else if (segment.x > prevSegment.x) {
              borderRadius = `0% 50% 50% 0%`; // Facing right
            } else if (segment.y < prevSegment.y) {
              borderRadius = `50% 50% 0% 0%`; // Facing up
            } else if (segment.y > prevSegment.y) {
              borderRadius = `0% 0% 50% 50%`; // Facing down
            }
          }
        } else {
          // Body of the snake
          const prevSegment = snake[index - 1];
          const nextSegment = snake[index + 1];
            if (prevSegment && nextSegment) {
            if (
              (prevSegment.x < segment.x && nextSegment.y < segment.y) ||
              (nextSegment.x < segment.x && prevSegment.y < segment.y)
            ) {
              borderRadius = `0% 0% 50% 0%`; // Turn top-left
            } else if (
              (prevSegment.x > segment.x && nextSegment.y < segment.y) ||
              (nextSegment.x > segment.x && prevSegment.y < segment.y)
            ) {
              borderRadius = `0% 0% 0% 50%`; // Turn top-right
            } else if (
              (prevSegment.x < segment.x && nextSegment.y > segment.y) ||
              (nextSegment.x < segment.x && prevSegment.y > segment.y)
            ) {
              borderRadius = `0% 50% 0% 0%`; // Turn bottom-left
            } else if (
              (prevSegment.x > segment.x && nextSegment.y > segment.y) ||
              (nextSegment.x > segment.x && prevSegment.y > segment.y)
            ) {
              borderRadius = `50% 0% 0% 0%`; // Turn bottom-right
            }
            }
        }

        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              borderRadius: borderRadius,
              left: `${(segment.x / boardWidth) * 100}%`,
              top: `${(segment.y / boardHeight) * 100}%`,
              width: `${100 / boardWidth}%`,
              height: `${100 / boardHeight}%`,
              backgroundColor: `var(--snake-color)`,
            }}
          />
        );
      })}
    </>
  );
};

export default Snake;