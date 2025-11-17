import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { api } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const ChatInterface = ({ sessionId, onNewSession }) => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      loadSessionHistory();
    } else {
      setMessages([]);
      setLoadingHistory(false);
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '52px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSessionHistory = async () => {
    try {
      setLoadingHistory(true);
      const session = await api.getSessionHistory(sessionId);
      setMessages(session.messages || []);
    } catch (error) {
      console.error('Error loading session history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput('');
    setLoading(true);

    try {
      let currentSessionId = sessionId;

      
      if (!currentSessionId) {
        const newSession = await api.startNewChat(question);
        currentSessionId = newSession.sessionId;
        onNewSession(currentSessionId);
      }

      
      const userMessage = {
        id: `msg-${Date.now()}-user`,
        type: 'user',
        content: question,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      
      const response = await api.askQuestion(currentSessionId, question);
      
      
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackUpdate = (messageId, feedback) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
  };

  if (loadingHistory) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading chat history...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
    
      {messages.length > 0 && (
        <div className={`border-b px-4 py-2 ${
          isDark ? 'border-gray-800 bg-[#212121]' : 'border-gray-200 bg-white'
        }`}>
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ChatBot</span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>v1.0</span>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-12 sm:pt-14 lg:pt-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
            <div className="mb-4 sm:mb-6">
              <div className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-400'
              }`}>ChatBot</div>
            </div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-normal mb-4 ${
              isDark ? 'text-gray-200' : 'text-gray-600'
            }`}>
              What can I help with?
            </h2>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                sessionId={sessionId}
                onFeedbackUpdate={handleFeedbackUpdate}
              />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className={`rounded-lg px-4 py-3 ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`border-t ${
        isDark ? 'border-gray-800 bg-[#212121]' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <form onSubmit={handleSend} className="relative">
            <div className="relative flex items-end">
              <button
                type="button"
                className={`absolute left-2 sm:left-3 bottom-2 sm:bottom-3 p-1.5 sm:p-2 rounded-lg transition-colors touch-manipulation ${
                  isDark 
                    ? 'hover:bg-gray-700 active:bg-gray-600 text-gray-400' 
                    : 'hover:bg-gray-200 active:bg-gray-100 text-gray-500'
                }`}
                aria-label="Attach file"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder="Ask anything"
                rows={1}
                className={`w-full pl-10 sm:pl-11 pr-20 sm:pr-24 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 resize-none overflow-hidden text-sm sm:text-base ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 focus:ring-gray-600 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 focus:ring-blue-500 text-gray-900 placeholder-gray-400'
                }`}
                style={{ minHeight: '44px', maxHeight: '200px' }}
                disabled={loading}
              />
              <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors touch-manipulation ${
                    isDark 
                      ? 'hover:bg-gray-700 active:bg-gray-600 text-gray-400' 
                      : 'hover:bg-gray-200 active:bg-gray-100 text-gray-500'
                  }`}
                  aria-label="Voice input"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
                  }`}
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

