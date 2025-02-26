import React from 'react';
import { Button, Container, Typography } from '@mui/material';

interface GameOverProps {
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onReset }) => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Game Over
      </Typography>
      <Button variant="contained" color="primary" onClick={onReset}>
        Reset Game
      </Button>
    </Container>
  );
};

export default GameOver;