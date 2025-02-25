// filepath: /snake-game/snake-game/src/types/index.ts
export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  body: Position[];
  direction: string;
}

export interface Food {
  position: Position;
}

export interface GameState {
  snake: Snake;
  food: Food;
  score: number;
  isGameOver: boolean;
}