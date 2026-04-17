const request = require('supertest');
const app = require('../src/app');

describe('Humath Backend API - Technical Test', () => {
  describe('Health Check', () => {
    it('should return 200 and health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('API is running');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('Home Endpoint', () => {
    it('should return 200 and welcome message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to Humath Backend API');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('External Data Routes - Posts', () => {
    it('should get all posts', async () => {
      const response = await request(app).get('/external-data/posts');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get posts by user ID', async () => {
      const response = await request(app).get('/external-data/posts?userId=1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
    });

    it('should get a single post by ID', async () => {
      const response = await request(app).get('/external-data/posts/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
    });

    it('should handle invalid post ID', async () => {
      const response = await request(app).get('/external-data/posts/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('External Data Routes - Users', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/external-data/users');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get a single user by ID', async () => {
      const response = await request(app).get('/external-data/users/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
    });

    it('should handle invalid user ID', async () => {
      const response = await request(app).get('/external-data/users/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('External Data Routes - Comments', () => {
    it('should get all comments', async () => {
      const response = await request(app).get('/external-data/comments');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get comments by post ID', async () => {
      const response = await request(app).get('/external-data/comments?postId=1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent endpoint', async () => {
      const response = await request(app).get('/non-existent-route');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Endpoint not found');
    });
  });
});
