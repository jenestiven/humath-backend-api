const express = require('express');
const config = require('./config');
const externalDataRoutes = require('./routes/externalData');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Home endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Humath Backend API',
    version: '1.0.0',
    description: 'Junior Backend Developer Technical Test By Jhon González',
    endpoints: {
      health: '/health',
      posts: '/external-data/posts',
      users: '/external-data/users',
      comments: '/external-data/comments',
    },
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/external-data', externalDataRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
