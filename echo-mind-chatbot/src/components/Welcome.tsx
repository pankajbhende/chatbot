import { useState } from 'react';
import AuthDialog from './AuthDialog';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import '../components/Welcomepage.css';

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    navigate('/chat');
  };

  return (
    <div className="welcome-background">
      <div className="welcome-container">
        <LanguageSelector />
        <h1>
          {t('welcome', 'Meet the')} <span style={{ color: '#b300ff' }}></span>!
        </h1>
        <p>{t('helpPrompt', 'Need our help now?')}</p>
        <button className="glowing-button" onClick={handleGetStarted}>
          {t('getStarted', 'Get Started →')}
        </button>
     
        <Dialog open={authOpen} onClose={() => setAuthOpen(false)}>
          <AuthDialog onSuccess={handleAuthSuccess} />
        </Dialog>
      </div>
    </div>
  );
};

export default WelcomePage;