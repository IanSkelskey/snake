import React from 'react';
import { Button, Container, Typography } from '@mui/material';

interface GameOverProps {
  score: number;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onReset }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Game Over
      </Typography>
      <Typography variant="h6" gutterBottom>
        Final Score: {score}
      </Typography>
      <Button variant="contained" color="primary" onClick={onReset}>
        Reset Game
      </Button>
    </Container>
  );
};

export default GameOver;
