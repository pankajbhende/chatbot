import { Routes, Route } from 'react-router-dom';
// import Welcome from './components/Welcome';
import ChatOptions from './components/ChatOptions';
import VoiceAssistant from './components/VoiceAssistant';
import ChatPage from './components/ChatPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />} /> */}
      <Route path="/" element={<ChatOptions />} />
      <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/chat/echo" element={<ChatPage />} />
      {/* Optional: Direct chat route for future use */}
      {/* <Route path="/chat/echo" element={<ChatWindow />} /> */}
    </Routes>
  );
}
