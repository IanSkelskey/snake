import { useEffect } from 'react';
import { Direction, ControlsOptions } from '../logic/types';

export function useControls({ onDirectionChange, onTogglePause }: ControlsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let direction: Direction | null = null;

      switch (event.key) {
        case 'w':
          direction = 'up';
          break;
        case 's':
          direction = 'down';
          break;
        case 'a':
          direction = 'left';
          break;
        case 'd':
          direction = 'right';
          break;
        case ' ':
        case 'p':
          onTogglePause();
          break;
      }

      if (direction) {
        onDirectionChange(direction);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        moveEvent.preventDefault();
        const moveTouch = moveEvent.touches[0];
        const diffX = moveTouch.clientX - startX;
        const diffY = moveTouch.clientY - startY;

        let direction: Direction | null = null;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            direction = 'right';
          } else {
            direction = 'left';
          }
        } else {
          if (diffY > 0) {
            direction = 'down';
          } else {
            direction = 'up';
          }
        }

        if (direction) {
          onDirectionChange(direction);
        }
      };

      window.addEventListener('touchmove', handleTouchMove);

      const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
      };

      window.addEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onDirectionChange, onTogglePause]);
}