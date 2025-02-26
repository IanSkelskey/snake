import React from 'react';
import { Button, Container, Typography } from '@mui/material';

interface MainMenuProps {
  onStart: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
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
      <Typography variant="h2" component="h1" gutterBottom>
        Snake Game
      </Typography>
      <Button variant="contained" color="primary" onClick={onStart}>
        Start Game
      </Button>
    </Container>
  );
};

export default MainMenu;