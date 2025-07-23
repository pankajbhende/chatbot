import {
  Box,
  Typography,
  IconButton,
  Stack,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import BookmarkIcon from '@mui/icons-material/BookmarkBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTranslation } from 'react-i18next';
import useSpeech from '../hooks/useSpeech';
import { useEffect, useState } from 'react';

import React from 'react';
import useSpeechRecognition from '../hooks/useSpeech';
import '../components/VoiceAssistant.css';

const VoicePage: React.FC = () => {
  const { transcript, listening, startListening } = useSpeechRecognition();

  return (
    
    <div className="voice-page">
      <div className="voice-header">Talk to Echo Mind</div>

      <div className="voice-controls">
        <button onClick={startListening}>Start Listening</button>
        {/* <button onClick={stopListening}>Stop</button> */}
      </div>

      <div className="voice-result">
        <p>{listening ? 'Listening...' : transcript || 'Start speaking to see text here'}</p>
      </div>
    </div>
  );
};




const VoiceAssistant = () => {
  const { t } = useTranslation();
  const {
    transcript,
    listening,
    isSupported,
    startListening,
    speak,
  } = useSpeech();

  const [botReply, setBotReply] = useState('');

  useEffect(() => {
    if (transcript) {
      // Fake bot logic
      const response = `You said: "${transcript}". I understand.`;
      setBotReply(response);
      speak(response);
    }
  }, [transcript, speak]);

  return (
   <Box
  sx={{
    height: { xs: 'auto', md: '100vh' },
    bgcolor: '#eaeaea',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: { xs: 2, md: 4 },
    gap: { xs: 2, md: 4 },
  }}
>
      <Typography variant="h5">{t('voiceAssessment')}</Typography>

      {!isSupported && (
        <Typography color="error">
          Your browser does not support speech recognition.
        </Typography>
      )}

       <Paper
    elevation={3}
    sx={{
      width: { xs: '90vw', sm: 300 },
      height: { xs: 'auto', sm: 200 },
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'white',
      p: 2,
      textAlign: 'center',
    }}
  >
        {listening ? (
          <CircularProgress size={60} thickness={4} />
        ) : transcript ? (
          <Typography variant="subtitle1">{transcript}</Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Press mic to start talking
          </Typography>
        )}
      </Paper>

      {botReply && (
        <Typography variant="body1" fontStyle="italic" color="primary">
          🤖 {botReply}
        </Typography>
      )}

      <Stack direction="row" spacing={3}>
        <IconButton
          size="large"
          color={listening ? 'error' : 'primary'}
          onClick={startListening}
        >
          <MicIcon fontSize="large" />
        </IconButton>

        <IconButton size="large" color="primary" onClick={() => speak(botReply)}>
          <PlayArrowIcon fontSize="large" />
        </IconButton>

        <IconButton size="large" color="primary">
          <BookmarkIcon fontSize="large" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default VoiceAssistant;
