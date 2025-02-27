import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

interface MainMenuProps {
  onStart: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
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
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Snake Game
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart}>
          Start Game
        </Button>
      </Box>
    </Container>
  );
};

export default MainMenu;