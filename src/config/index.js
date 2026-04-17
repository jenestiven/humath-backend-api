require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  externalApiUrl: process.env.EXTERNAL_API_URL,
  apiTimeout: process.env.API_TIMEOUT,
};
