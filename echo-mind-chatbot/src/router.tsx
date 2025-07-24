import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import VoiceAssistant from './components/VoiceAssistant';
import ChatPage from './components/ChatPage';
import Dashboard from './components/Dashboard'
import ChatOptions from './components/ChatOptions';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/chat/echo" element={<ChatPage />} />
        <Route path="/" element={<ChatOptions/>}/>
      {/* Optional: Direct chat route for future use */}
    </Routes>
  );
}
