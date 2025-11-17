import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ThemeToggle from './components/ThemeToggle';

const AppContent = () => {
  const { sessionId: urlSessionId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(urlSessionId || null);
  const [sidebarRefresh, setSidebarRefresh] = useState(0);

  useEffect(() => {
    if (urlSessionId) {
      setCurrentSessionId(urlSessionId);
    } else {
      setCurrentSessionId(null);
    }
  }, [urlSessionId]);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    navigate('/');
  };

  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    navigate(`/chat/${sessionId}`);
  };

  const handleNewSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    navigate(`/chat/${sessionId}`);
    setSidebarRefresh(prev => prev + 1);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#212121] text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        currentSessionId={currentSessionId}
        refreshTrigger={sidebarRefresh}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`lg:hidden fixed top-3 left-3 z-20 p-2.5 rounded-xl touch-manipulation transition-all duration-200 ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-gray-200 shadow-lg shadow-black/20' 
              : 'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 shadow-lg shadow-gray-200/50 border border-gray-200'
          }`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h18v2H3V4zm0 5h18v2H3V9zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          )}
        </button>

        {/* Theme Toggle */}
        <div className="fixed top-3 right-3 lg:absolute lg:top-4 lg:right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Chat Interface */}
        <ChatInterface
          sessionId={currentSessionId}
          onNewSession={handleNewSession}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/chat/:sessionId" element={<AppContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

