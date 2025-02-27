import React from 'react';
import { Box, Toolbar, Typography, Button, Container } from '@mui/material';

interface HUDProps {
	score: number;
	isPaused: boolean;
	onPause: () => void;
	onReset: () => void;
}

const HUD: React.FC<HUDProps> = ({ score, isPaused, onPause, onReset }) => {
	return (
		<Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 1, mb: 2 }}>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
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
			</Container>
		</Box>
	);
};

export default HUD;
