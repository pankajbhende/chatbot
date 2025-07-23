import { useState } from 'react';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  onSuccess: () => void;
};

export default function AuthDialog({ onSuccess }: Props) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'login' | 'signup' | null
  ) => {
    if (newMode !== null) setMode(newMode);
  };

  const handleSubmit = () => {
    // Mock auth (in-memory)
    if (email && password) {
      localStorage.setItem('echoMindUser', JSON.stringify({ email }));
      onSuccess(); // move to /chat
    }
  };

  return (
    <>
      <DialogTitle>{mode === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            fullWidth
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="signup">Sign Up</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          *Mock authentication (no backend)
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </Button>
      </DialogActions>
    </>
  );
}
