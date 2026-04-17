const axios = require('axios');
const config = require('../config');

const apiClient = axios.create({
  baseURL: config.externalApiUrl,
  timeout: config.apiTimeout,
});

class ExternalDataService {
  async getPosts(userId = null) {
    try {
      const endpoint = userId ? `/users/${userId}/posts` : '/posts';
      const response = await apiClient.get(endpoint);
      return {
        success: true,
        data: response.data,
        count: response.data.length,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostById(postId) {
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUsers() {
    try {
      const response = await apiClient.get('/users');
      return {
        success: true,
        data: response.data,
        count: response.data.length,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getComments(postId = null) {
    try {
      const endpoint = postId ? `/posts/${postId}/comments` : '/comments';
      const response = await apiClient.get(endpoint);
      return {
        success: true,
        data: response.data,
        count: response.data.length,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return new Error(
        `External API Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      return new Error('External API Error: No response received');
    } else {
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

module.exports = new ExternalDataService();
