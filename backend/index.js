const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Middleware
app.use(cors({
  origin: 'https://youtube-clone-frontend-gamma.vercel.app',
  credentials: true
}));
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
