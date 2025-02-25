import React from 'react';

interface SnakeProps {
  snake: { x: number; y: number }[];
}

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake"
          style={{
            left: `${segment.x * 20}px`,
            top: `${segment.y * 20}px`,
            width: '20px',
            height: '20px',
          }}
        />
      ))}
    </div>
  );
};

export default Snake;