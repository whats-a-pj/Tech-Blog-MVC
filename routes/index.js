// routes/index.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homepage');
const dashBoard = require('../controllers/dashboard');
const posts = require('../controllers/posts');
const authentication = require('../controllers/auth');

// Define routes
router.get('/', homeController.getHomePage);
// Define other routes using controllers

module.exports = router;
