import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, ThemeProvider, createTheme, useMediaQuery, Box, Container } from '@mui/material';
import SnakeGame from './games/SnakeGame';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div">
              Snake Game
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <SnakeGame />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;