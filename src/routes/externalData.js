const express = require('express');
const externalDataController = require('../controllers/externalDataController');

const router = express.Router();

// Posts endpoints
router.get('/posts', externalDataController.getPosts);
router.get('/posts/:id', externalDataController.getPostById);

// Users endpoints
router.get('/users', externalDataController.getUsers);
router.get('/users/:id', externalDataController.getUserById);

// Comments endpoints
router.get('/comments', externalDataController.getComments);

module.exports = router;
