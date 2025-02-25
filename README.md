# Snake Game

This is a basic Snake game built with React and TypeScript. The game allows players to control a snake that grows in length as it eats food, while avoiding collisions with the walls and itself.

## Project Structure

```
snake-game
├── src
│   ├── App.tsx               # Main entry point of the application
│   ├── components
│   │   ├── GameBoard.tsx     # Renders the game area and manages game logic
│   │   └── Snake.tsx         # Represents the snake and its rendering
│   ├── assets
│   │   └── snake.svg         # SVG graphic for the snake
│   ├── styles
│   │   └── App.css           # CSS styles for the application
│   └── types
│       └── index.ts          # TypeScript types and interfaces
├── public
│   └── index.html            # Main HTML file for the React application
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Getting Started

To run the game locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd snake-game
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to play the game.

## How to Play

- Use the arrow keys to control the direction of the snake.
- Eat the food to grow the snake.
- Avoid colliding with the walls or the snake's own body.

Enjoy the game!