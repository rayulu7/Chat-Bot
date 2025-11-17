const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
 
  startNewChat: async (question = '') => {
    const response = await fetch(`${API_BASE_URL}/chat/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    return response.json();
  },

 
  askQuestion: async (sessionId, question) => {
    const response = await fetch(`${API_BASE_URL}/chat/${sessionId}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    return response.json();
  },

  
  getSessions: async () => {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    return response.json();
  },

  
  getSessionHistory: async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`);
    return response.json();
  },

 
  updateFeedback: async (sessionId, messageId, feedback) => {
    const response = await fetch(`${API_BASE_URL}/chat/${sessionId}/message/${messageId}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }),
    });
    return response.json();
  },
};

