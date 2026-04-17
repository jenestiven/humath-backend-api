const externalDataService = require('../services/externalDataService');

class ExternalDataController {
  async getPosts(req, res) {
    try {
      const { userId } = req.query;
      const result = await externalDataService.getPosts(userId);
      
      res.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        timestamp: new Date().toISOString(),
        data: result.data,
        count: result.count,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid post ID',
          timestamp: new Date().toISOString(),
        });
      }

      const result = await externalDataService.getPostById(id);
      
      res.status(200).json({
        success: true,
        message: 'Post retrieved successfully',
        timestamp: new Date().toISOString(),
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getUsers(req, res) {
    try {
      const result = await externalDataService.getUsers();
      
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        timestamp: new Date().toISOString(),
        data: result.data,
        count: result.count,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
          timestamp: new ISOString(),
        });
      }

      const result = await externalDataService.getUserById(id);
      
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        timestamp: new Date().toISOString(),
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getComments(req, res) {
    try {
      const { postId } = req.query;
      const result = await externalDataService.getComments(postId);
      
      res.status(200).json({
        success: true,
        message: 'Comments retrieved successfully',
        timestamp: new Date().toISOString(),
        data: result.data,
        count: result.count,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

module.exports = new ExternalDataController();
