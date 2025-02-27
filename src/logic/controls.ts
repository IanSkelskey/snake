import { useEffect } from 'react';
import { Direction, ControlsOptions } from '../logic/types';

export function useControls({ onDirectionChange, onTogglePause }: ControlsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let direction: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
          direction = 'left';
          break;
        case 'ArrowRight':
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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDirectionChange, onTogglePause]);
}