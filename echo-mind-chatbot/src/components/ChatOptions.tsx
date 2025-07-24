import { useNavigate } from 'react-router-dom';
import '../components/ChatOptions.css';
import Dashboard from './Dashboard';

const ChatOptions = () => {
  const navigate = useNavigate();

  const tabs = [
    { label: 'Chat with FinBot', path: '/chat/echo' },
    { label: 'Talk with FinBot', path: '/voice' },
    { label: 'Financial Tools', path: '/tools' },
    { label: 'Insights', path: '/insights' }
  ];

  return (
    <div className="chat-options-container">
      {/* Header */}
      <header className="chat-options-header">
        <div className="chat-options-branding">
          <img
            src={require('../images/chatbot.png')}
            alt="FinBot Logo"
            className="chat-options-logo"
          />
          <span className="chat-options-title">FinBot</span>
        </div>
      </header>

      {/* Image section */}
      <div className="chat-options-image-wrapper">
        <img
          src={require('../welcome-bgd.png')}
          alt="Finance Illustration"
          className="chat-options-main-image"
        />
      </div>

      {/* Tabs section */}
      <div className="chat-options-tabs-wrapper">
        <div className="chat-options-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.path}
              className="chat-options-tab"
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      <Dashboard />
    </div>
  );
};

export default ChatOptions;