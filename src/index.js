const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Humath Backend API - Technical Test                      ║
║  ✓ Server running on port: ${config.port}                      
║  ✓ Environment: ${config.nodeEnv}                          
║  ✓ External API: ${config.externalApiUrl}          
║  ✓ Timestamp: ${new Date().toISOString()}
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = server;
