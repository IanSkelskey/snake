// Position interface to represent x and y coordinates
export interface Position {
	x: number;
	y: number;
  }
  
  // SnakeSegment interface extends Position to represent a segment of the snake
  export interface SnakeSegment extends Position {}
  
  // GameState interface to represent the state of the game
  export interface GameState {
	snake: SnakeSegment[];
	food: Position;
	item: Position;
	direction: Position;
	score: number;
	isPaused: boolean;
	isGameOver: boolean;
  }
  
  // GameSettings interface to represent configurable settings for the game
  export interface GameSettings {
	boardWidth: number;
	boardHeight: number;
	initialFrameDuration: number;
	minFrameDuration: number;
	speedIncrementFood: number;
	speedIncrementItem: number;
  }
  
  // ControlsOptions interface to represent the options for game controls
  export interface ControlsOptions {
	onDirectionChange: (dir: Position) => void;
	onTogglePause: () => void;
  }
  
  // BoardObjectType type to represent the different types of objects on the board
  export type BoardObjectType = 'food' | 'item';
  
  // Direction type to represent the possible directions the snake can move
  export type Direction = 'up' | 'down' | 'left' | 'right';