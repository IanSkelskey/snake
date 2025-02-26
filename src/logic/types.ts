export interface Position {
	x: number;
	y: number;
}

export interface SnakeSegment extends Position { }

export interface GameState {
	snake: SnakeSegment[];
	food: Position;
	item: Position;
	direction: Position;
	score: number;
	isPaused: boolean;
	isGameOver: boolean;
}
