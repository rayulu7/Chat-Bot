# ChatGPT-Style Application

A full-stack ChatGPT-style application built with React, JavaScript, TailwindCSS, and Node.js (Express). This application features a responsive frontend with dark/light theme support, session management, and a backend API serving mock data.

## Features

### Frontend
Landing page with "New Chat" functionality
 Collapsible left sidebar with:
  - All chat sessions
  - "New Chat" button
  - User information
Chat interface with:
  - Real-time message display
  - Table view for structured data
  - Descriptions for answers
Answer feedback (Like/Dislike buttons)
Dark/Light theme toggle
Session management:
  - Session-based chat with URL routing
  - Session history in sidebar
  - Click to load conversation history

### Backend
RESTful API with Express
Mock data storage (JSON file)
Session management
Message history tracking

## Project Structure

```
BOT/
├── backend/
│   ├── server.js           # Express server
│   ├── package.json
│   ├── routes/
│   │   └── api.js         # API routes
│   └── data/
│       └── mockData.json  # Mock data storage
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── ChatInterface.js
│   │   │   ├── Message.js
│   │   │   ├── TableView.js
│   │   │   └── ThemeToggle.js
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   └── utils/
│   │       └── api.js
│   └── tailwind.config.js
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

### Backend API (Base URL: `http://localhost:5000/api`)

- `POST /chat/new` - Start a new chat session
  - Request body: `{ "question": "optional question" }`
  - Response: `{ "sessionId": "session-1", "title": "New Chat" }`

- `POST /chat/:sessionId/ask` - Ask a question in a session
  - Request body: `{ "question": "your question" }`
  - Response: `{ "id": "msg-id", "type": "assistant", "content": "...", "table": {...}, "timestamp": "..." }`

- `GET /sessions` - Get all sessions
  - Response: `[{ "id": "session-1", "title": "Chat Title", "createdAt": "...", "messageCount": 5 }]`

- `GET /chat/:sessionId` - Get session history
  - Response: `{ "id": "session-1", "title": "...", "messages": [...], "createdAt": "..." }`

- `POST /chat/:sessionId/message/:messageId/feedback` - Update feedback
  - Request body: `{ "feedback": "like" | "dislike" }`
  - Response: `{ "success": true, "feedback": "like" }`

## Usage

1. **Start a New Chat**: Click the "New Chat" button in the sidebar or on the landing page.

2. **Ask Questions**: Type your question in the input field and press Send or Enter.

3. **View Responses**: Responses will include:
   - Text description
   - Structured table data (when applicable)
   - Like/Dislike feedback buttons

4. **Manage Sessions**: 
   - All sessions appear in the left sidebar
   - Click on a session to view its history
   - Session ID is reflected in the URL

5. **Toggle Theme**: Click the theme toggle button in the top bar to switch between dark and light modes.

6. **Mobile View**: On mobile devices, the sidebar can be toggled using the hamburger menu.

## Technologies Used

- **Frontend**:
  - React 18
  - React Router DOM
  - TailwindCSS
  - JavaScript (ES6+)

- **Backend**:
  - Node.js
  - Express.js
  - CORS middleware

## Development

### Backend Development
- The backend uses mock JSON data stored in `backend/data/mockData.json`
- Sessions and messages are persisted in this file
- No database required

### Frontend Development
- Uses React Router for navigation
- Theme preference is stored in localStorage
- Responsive design with TailwindCSS
- Mobile-first approach

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` folder.

### Backend
The backend can be run in production using:
```bash
cd backend
npm start
```

Or use a process manager like PM2:
```bash
pm2 start server.js
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to submit issues and enhancement requests!

