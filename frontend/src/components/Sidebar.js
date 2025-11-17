import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose, onNewChat, onSelectSession, currentSessionId, refreshTrigger }) => {
  const { isDark } = useTheme();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      loadSessions();
    }
  }, [refreshTrigger]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await api.getSessions();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    onNewChat();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSessionClick = (sessionId) => {
    onSelectSession(sessionId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sm:w-72 lg:w-64 transform transition-transform duration-300 ease-in-out ${
          isDark ? 'bg-[#171717]' : 'bg-gray-50'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`flex flex-col h-full ${isDark ? 'bg-[#171717]' : 'bg-gray-50'}`}>
          {/* Logo/Header */}
          <div className={`p-3 sm:p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={handleNewChat}
              className={`w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-lg transition-colors border touch-manipulation ${
                isDark 
                  ? 'hover:bg-gray-800 text-white border-gray-700 active:bg-gray-700' 
                  : 'hover:bg-gray-200 text-gray-900 border-gray-300 bg-white active:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm sm:text-base font-medium">New chat</span>
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-3">
            {loading ? (
              <div className={`text-center py-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="text-sm sm:text-base">Loading...</div>
              </div>
            ) : sessions.length === 0 ? (
              <div className={`text-center py-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="text-sm sm:text-base">No chats yet</div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className={`px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Chats
                </div>
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                    className={`w-full text-left px-3 py-2.5 sm:py-3 rounded-lg transition-colors touch-manipulation ${
                      currentSessionId === session.id
                        ? isDark
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-900'
                        : isDark
                          ? 'hover:bg-gray-800 active:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-200 active:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="truncate text-sm sm:text-base">{session.title}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className={`p-3 sm:p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer touch-manipulation ${
              isDark ? 'hover:bg-gray-800 active:bg-gray-700' : 'hover:bg-gray-200 active:bg-gray-100'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <img 
                  src="/Rayulu.jpg" 
                  alt="Rayulu" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <span className="text-white font-semibold text-sm sm:text-base hidden">R</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm sm:text-base font-medium truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Rayulu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

