import React, { useState } from 'react';
import TableView from './TableView';
import { api } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Message = ({ message, sessionId, onFeedbackUpdate }) => {
  const { isDark } = useTheme();
  const [feedback, setFeedback] = useState(message.feedback);

  const handleFeedback = async (type) => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    
    try {
      await api.updateFeedback(sessionId, message.id, newFeedback);
      if (onFeedbackUpdate) {
        onFeedbackUpdate(message.id, newFeedback);
      }
    } catch (error) {
      console.error('Error updating feedback:', error);
      setFeedback(feedback); // Revert on error
    }
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-4 sm:mb-6 group">
        <div className={`max-w-[90%] sm:max-w-[85%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
          isDark ? 'bg-gray-800' : 'bg-blue-500'
        }`}>
          <p className={`text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap ${
            isDark ? 'text-white' : 'text-white'
          }`}>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4 sm:mb-6 group">
      <div className="max-w-[90%] sm:max-w-[85%]">
        <div className={`text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap mb-2 sm:mb-3 ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {message.content}
        </div>
        
        {message.table && (
          <div className="mb-3">
            <TableView table={message.table} />
          </div>
        )}
        
        {message.table?.description && (
          <p className={`text-xs sm:text-sm mt-2 mb-2 sm:mb-3 italic ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {message.table.description}
          </p>
        )}
        
        <div className={`flex items-center gap-1 mt-2 transition-opacity ${
          feedback ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
        }`}>
          <button
            onClick={() => handleFeedback('like')}
            className={`p-1.5 sm:p-2 rounded-md transition-colors touch-manipulation ${
              feedback === 'like'
                ? isDark
                  ? 'bg-gray-700 text-green-400'
                  : 'bg-gray-200 text-green-600'
                : isDark
                  ? 'hover:bg-gray-800 active:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 active:bg-gray-100 text-gray-500'
            }`}
            aria-label="Like"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.994a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </button>
          <button
            onClick={() => handleFeedback('dislike')}
            className={`p-1.5 sm:p-2 rounded-md transition-colors touch-manipulation ${
              feedback === 'dislike'
                ? isDark
                  ? 'bg-gray-700 text-red-400'
                  : 'bg-gray-200 text-red-600'
                : isDark
                  ? 'hover:bg-gray-800 active:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 active:bg-gray-100 text-gray-500'
            }`}
            aria-label="Dislike"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.994a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;

