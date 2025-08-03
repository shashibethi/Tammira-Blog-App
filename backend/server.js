const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();
require('./models/user');
const blogRoutes = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/blogs', blogRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

app.get('/test-db', async (req, res) => {
  try {
    const Blog = require('./models/blog');
    const count = await Blog.countDocuments();
    res.json({ 
      message: 'Database connected successfully', 
      blogCount: count 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error.message 
    });
  }
});

// Add this to server.js temporarily
app.get('/create-sample-data', async (req, res) => {
  try {
    const User = require('./models/user');
    const Blog = require('./models/blog');
    
    // Create a sample user first
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        bio: 'Sample user'
      });
    }
    
    // Create sample blogs
    const sampleBlogs = [
      {
        title: 'First Blog Post',
        sub_title: 'This is the first blog post',
        content: 'This is the content of the first blog post...',
        slug: 'first-blog-post',
        tags: ['javascript', 'nodejs'],
        author: user._id,
        status: 'published'
      },
      {
        title: 'Second Blog Post',
        sub_title: 'This is the second blog post',
        content: 'This is the content of the second blog post...',
        slug: 'second-blog-post',
        tags: ['react', 'frontend'],
        author: user._id,
        status: 'published'
      }
    ];
    
    await Blog.deleteMany({}); // Clear existing blogs
    await Blog.insertMany(sampleBlogs);
    
    res.json({ message: 'Sample data created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});