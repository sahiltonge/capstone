const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Middleware
const corsOptions = {
  origin: 'https://youtube-clone-frontend-gamma.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // allow cookies/auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
require('./Connection/conn');

// Routes
const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/auth', AuthRoutes);
app.use('/video', VideoRoutes);
app.use('/comment', CommentRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
