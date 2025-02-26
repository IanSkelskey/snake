import { useEffect } from 'react';
import { Position } from './types';

interface ControlsOptions {
  onDirectionChange: (dir: Position) => void;
  onTogglePause: () => void;
}

export function useControls({ onDirectionChange, onTogglePause }: ControlsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          onDirectionChange({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          onDirectionChange({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          onDirectionChange({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          onDirectionChange({ x: 1, y: 0 });
          break;
        case ' ':
        case 'p':
        case 'P':
          onTogglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDirectionChange, onTogglePause]);

  // Touch Controls
  useEffect(() => {
    const handleTouchStart = (startEvent: TouchEvent) => {
      if (startEvent.touches.length !== 1) return;

      const startX = startEvent.touches[0].clientX;
      const startY = startEvent.touches[0].clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length !== 1) return;

        const diffX = moveEvent.touches[0].clientX - startX;
        const diffY = moveEvent.touches[0].clientY - startY;

        // Horizontal vs. Vertical swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
          // Left or right
          if (diffX > 0) {
            onDirectionChange({ x: 1, y: 0 });
          } else {
            onDirectionChange({ x: -1, y: 0 });
          }
        } else {
          // Up or down
          if (diffY > 0) {
            onDirectionChange({ x: 0, y: 1 });
          } else {
            onDirectionChange({ x: 0, y: -1 });
          }
        }
      };

      const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };

      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onDirectionChange]);
}
