import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import SnakeGame from './SnakeGame';
import './styles/App.css';

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
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div">
              Snake Game
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* This is to push the content below the AppBar */}
        <SnakeGame />
      </div>
    </ThemeProvider>
  );
}

export default App;