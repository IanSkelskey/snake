import React from 'react';
import Snake from './Snake';
import { GameState } from '../logic/types';

interface GameBoardProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
  boardSize?: number; // for styling
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onPause,
  onReset,
  boardSize = 400,
}) => {
  const cellSize = 20;
  const boardStyle: React.CSSProperties = {
    width: boardSize,
    height: boardSize,
    position: 'relative',
    border: '2px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
    margin: '0 auto',
  };

  const { snake, food, item, score, isPaused } = gameState;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 16 }}>
        <strong>Score:</strong> {score}{" "}
        <span style={{ marginLeft: '1rem' }}>
          <strong>Paused:</strong> {isPaused ? 'Yes' : 'No'}
        </span>
      </div>

      <div style={boardStyle}>
        {/* Snake */}
        <Snake snake={snake} cellSize={cellSize} />

        {/* Food */}
        <div
          style={{
            position: 'absolute',
            left: food.x * cellSize,
            top: food.y * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: 'var(--food-color)',
            borderRadius: 4,
          }}
        />

        {/* Item */}
        <div
          style={{
            position: 'absolute',
            left: item.x * cellSize,
            top: item.y * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: 'var(--item-color)',
            borderRadius: 4,
          }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={onPause} style={{ marginRight: 8 }}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
