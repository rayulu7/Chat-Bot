const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const mockDataPath = path.join(dataDir, 'mockData.json');
let mockData = {};


if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}


if (fs.existsSync(mockDataPath)) {
  mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
} else {
 
  mockData = {
    sessions: {},
    sessionCounter: 0
  };
  fs.writeFileSync(mockDataPath, JSON.stringify(mockData, null, 2));
}


function saveMockData() {
  fs.writeFileSync(mockDataPath, JSON.stringify(mockData, null, 2));
}


const questionResponses = {
 
  'who are you': {
    content: 'I am ChatBot, an AI assistant designed to help you with various tasks. I can answer questions, provide information, and assist with data analysis.',
    table: {
      headers: ['Feature', 'Description', 'Status'],
      rows: [
        ['AI Assistant', 'Natural language processing and understanding', 'Active'],
        ['Data Analysis', 'Structured data presentation and insights', 'Active'],
        ['Chat Interface', 'Interactive conversation support', 'Active'],
        ['Session Management', 'Multi-conversation tracking', 'Active']
      ],
      description: 'Here are my key capabilities and features.'
    }
  },
  'what are you': {
    content: 'I am ChatBot, an AI-powered assistant built to help users with questions, data analysis, and information retrieval.',
    table: {
      headers: ['Capability', 'Details', 'Availability'],
      rows: [
        ['Question Answering', 'Responds to user queries', '24/7'],
        ['Data Presentation', 'Displays information in tables', '24/7'],
        ['Conversation History', 'Maintains session context', '24/7'],
        ['Multi-topic Support', 'Handles various subjects', '24/7']
      ],
      description: 'My capabilities and availability overview.'
    }
  },
  'what can you do': {
    content: 'I can help you with a variety of tasks including answering questions, analyzing data, providing information, and maintaining conversation context across sessions.',
    table: {
      headers: ['Task Type', 'Example', 'Support Level'],
      rows: [
        ['Information Retrieval', 'What is React?', 'Full Support'],
        ['Data Analysis', 'Show me sales data', 'Full Support'],
        ['General Questions', 'How does X work?', 'Full Support'],
        ['Technical Questions', 'Explain programming concepts', 'Full Support']
      ],
      description: 'Supported task types and examples.'
    }
  },
  
  
  'products': {
    content: 'Here is our current product inventory with pricing and stock information.',
    table: {
      headers: ['Product', 'Price', 'Stock', 'Category'],
      rows: [
        ['Laptop Pro 15"', '$1,299', '25', 'Electronics'],
        ['Wireless Mouse', '$29.99', '150', 'Accessories'],
        ['Mechanical Keyboard', '$89.99', '45', 'Accessories'],
        ['4K Monitor 27"', '$399.99', '30', 'Electronics'],
        ['USB-C Hub', '$49.99', '80', 'Accessories']
      ],
      description: 'Current product inventory with pricing and availability.'
    }
  },
  'inventory': {
    content: 'Current inventory status across all product categories.',
    table: {
      headers: ['Product', 'Price', 'Stock', 'Category'],
      rows: [
        ['Laptop Pro 15"', '$1,299', '25', 'Electronics'],
        ['Wireless Mouse', '$29.99', '150', 'Accessories'],
        ['Mechanical Keyboard', '$89.99', '45', 'Accessories'],
        ['4K Monitor 27"', '$399.99', '30', 'Electronics'],
        ['USB-C Hub', '$49.99', '80', 'Accessories']
      ],
      description: 'Complete inventory listing with stock levels.'
    }
  },
  
  
  'employees': {
    content: 'Here is our team structure and employee information.',
    table: {
      headers: ['Employee', 'Department', 'Role', 'Experience'],
      rows: [
        ['John Doe', 'Engineering', 'Senior Developer', '5 years'],
        ['Jane Smith', 'Marketing', 'Marketing Manager', '3 years'],
        ['Bob Johnson', 'Sales', 'Sales Representative', '2 years'],
        ['Alice Williams', 'Engineering', 'Tech Lead', '7 years'],
        ['Charlie Brown', 'HR', 'HR Manager', '4 years']
      ],
      description: 'Employee directory with department and role information.'
    }
  },
  'team': {
    content: 'Our team members across different departments.',
    table: {
      headers: ['Employee', 'Department', 'Role', 'Experience'],
      rows: [
        ['John Doe', 'Engineering', 'Senior Developer', '5 years'],
        ['Jane Smith', 'Marketing', 'Marketing Manager', '3 years'],
        ['Bob Johnson', 'Sales', 'Sales Representative', '2 years'],
        ['Alice Williams', 'Engineering', 'Tech Lead', '7 years'],
        ['Charlie Brown', 'HR', 'HR Manager', '4 years']
      ],
      description: 'Team structure and member details.'
    }
  },
  
  
  'cities': {
    content: 'Major cities around the world with demographic and economic data.',
    table: {
      headers: ['City', 'Population', 'Country', 'GDP'],
      rows: [
        ['New York', '8.3M', 'USA', '$1.5T'],
        ['London', '9.0M', 'UK', '$650B'],
        ['Tokyo', '13.9M', 'Japan', '$1.2T'],
        ['Paris', '2.1M', 'France', '$750B'],
        ['Sydney', '5.3M', 'Australia', '$400B']
      ],
      description: 'Global cities comparison with key metrics.'
    }
  },
  'locations': {
    content: 'Geographic locations and their key statistics.',
    table: {
      headers: ['City', 'Population', 'Country', 'GDP'],
      rows: [
        ['New York', '8.3M', 'USA', '$1.5T'],
        ['London', '9.0M', 'UK', '$650B'],
        ['Tokyo', '13.9M', 'Japan', '$1.2T'],
        ['Paris', '2.1M', 'France', '$750B'],
        ['Sydney', '5.3M', 'Australia', '$400B']
      ],
      description: 'Location data with demographic and economic indicators.'
    }
  },
  
 
  'sales': {
    content: 'Sales performance data for the current period.',
    table: {
      headers: ['Product', 'Units Sold', 'Revenue', 'Quarter'],
      rows: [
        ['Laptop Pro', '150', '$194,850', 'Q4 2024'],
        ['Wireless Mouse', '450', '$13,496', 'Q4 2024'],
        ['Mechanical Keyboard', '120', '$10,799', 'Q4 2024'],
        ['4K Monitor', '85', '$33,999', 'Q4 2024'],
        ['USB-C Hub', '200', '$9,998', 'Q4 2024']
      ],
      description: 'Sales figures and revenue breakdown by product.'
    }
  },
  'revenue': {
    content: 'Revenue breakdown by product category.',
    table: {
      headers: ['Product', 'Units Sold', 'Revenue', 'Quarter'],
      rows: [
        ['Laptop Pro', '150', '$194,850', 'Q4 2024'],
        ['Wireless Mouse', '450', '$13,496', 'Q4 2024'],
        ['Mechanical Keyboard', '120', '$10,799', 'Q4 2024'],
        ['4K Monitor', '85', '$33,999', 'Q4 2024'],
        ['USB-C Hub', '200', '$9,998', 'Q4 2024']
      ],
      description: 'Revenue analysis by product for current quarter.'
    }
  },
  
  
  'default': {
    content: 'I understand your question. Here is some relevant information that might help.',
    table: {
      headers: ['Topic', 'Information', 'Details'],
      rows: [
        ['General Info', 'I can help with various topics', 'Ask me anything'],
        ['Data Analysis', 'I can present data in tables', 'Structured format'],
        ['Questions', 'I answer questions', 'Multiple topics'],
        ['Conversations', 'I maintain context', 'Session-based']
      ],
      description: 'General information about my capabilities.'
    }
  }
};


function generateResponse(question) {
  const lowerQuestion = question.toLowerCase().trim();
  
 
  let response = questionResponses['default'];
  
 
  if (questionResponses[lowerQuestion]) {
    response = questionResponses[lowerQuestion];
  } else {
    
    const keywords = Object.keys(questionResponses).filter(key => key !== 'default');
    for (const keyword of keywords) {
      if (lowerQuestion.includes(keyword)) {
        response = questionResponses[keyword];
        break;
      }
    }
  }
  
  return {
    table: response.table,
    description: response.content,
    timestamp: new Date().toISOString()
  };
}


function generateTitle(question) {
  const words = question.split(' ').slice(0, 5).join(' ');
  return words.length > 30 ? words.substring(0, 30) + '...' : words;
}


router.post('/chat/new', (req, res) => {
  const sessionId = `session-${++mockData.sessionCounter}`;
  const title = req.body.question 
    ? generateTitle(req.body.question) 
    : 'New Chat';
  
  mockData.sessions[sessionId] = {
    id: sessionId,
    title: title,
    messages: [],
    createdAt: new Date().toISOString()
  };
  
  saveMockData();
  
  res.json({
    sessionId: sessionId,
    title: title
  });
});


router.post('/chat/:sessionId/ask', (req, res) => {
  const { sessionId } = req.params;
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  
  if (!mockData.sessions[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const response = generateResponse(question);
  
  
  mockData.sessions[sessionId].messages.push({
    id: `msg-${Date.now()}-user`,
    type: 'user',
    content: question,
    timestamp: new Date().toISOString()
  });
  
 
  const assistantMessage = {
    id: `msg-${Date.now()}-assistant`,
    type: 'assistant',
    content: response.description,
    table: response.table,
    timestamp: response.timestamp,
    feedback: null
  };
  
  mockData.sessions[sessionId].messages.push(assistantMessage);
  

  if (mockData.sessions[sessionId].messages.length === 2) {
    mockData.sessions[sessionId].title = generateTitle(question);
  }
  
  saveMockData();
  
  res.json(assistantMessage);
});


router.get('/sessions', (req, res) => {
  const sessions = Object.values(mockData.sessions).map(session => ({
    id: session.id,
    title: session.title,
    createdAt: session.createdAt,
    messageCount: session.messages.length
  }));
  
 
  sessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json(sessions);
});


router.get('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!mockData.sessions[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json(mockData.sessions[sessionId]);
});


router.post('/chat/:sessionId/message/:messageId/feedback', (req, res) => {
  const { sessionId, messageId } = req.params;
  const { feedback } = req.body; // 'like' or 'dislike'
  
  if (!mockData.sessions[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const session = mockData.sessions[sessionId];
  const message = session.messages.find(msg => msg.id === messageId);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  message.feedback = feedback;
  saveMockData();
  
  res.json({ success: true, feedback: feedback });
});

module.exports = router;

