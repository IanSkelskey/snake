import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';

interface HUDProps {
	score: number;
	isPaused: boolean;
	onPause: () => void;
	onReset: () => void;
}

const HUD: React.FC<HUDProps> = ({ score, isPaused, onPause, onReset }) => {
	const theme = useTheme();
	const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	return (
		<AppBar position="static" >
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					<strong>Score:</strong> {score}
				</Typography>
				<Box>
					<Button variant="contained" color="primary" onClick={onPause} sx={{ mr: 1 }}>
						{isPaused ? 'Resume' : 'Pause'}
					</Button>
					<Button variant="contained" color="secondary" onClick={onReset}>
						Reset
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default HUD;
