import React from 'react';
import Snake from './Snake';

interface GameBoardProps {
  gameState: {
    snake: { x: number; y: number }[];
    food: { x: number; y: number };
    item: { x: number; y: number };
    direction: { x: number; y: number };
    isGameOver: boolean;
  };
  boardRef: React.RefObject<HTMLDivElement | null>;
  virtualResolution: number;
  resetGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, boardRef, virtualResolution }) => {
  return (
    <div ref={boardRef} className="game-board">
      <div className="virtual-board" style={{ transform: `scale(${(boardRef.current?.clientWidth ?? virtualResolution) / virtualResolution})` }}>
        <Snake snake={gameState.snake} />
        <div className="food" style={{ left: `${gameState.food.x * 20}px`, top: `${gameState.food.y * 20}px`, width: '20px', height: '20px' }} />
        <div className="item" style={{ left: `${gameState.item.x * 20}px`, top: `${gameState.item.y * 20}px`, width: '20px', height: '20px' }} />
      </div>
    </div>
  );
};

export default GameBoard;