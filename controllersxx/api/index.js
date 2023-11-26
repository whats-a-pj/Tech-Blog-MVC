// routes/index.js
const express = require('express');
const router = express.Router();
const homeController = require('../homepage');
const dashBoard = require('../dashboard');
const posts = require('../posts');
const authentication = require('../auth');

// Define routes
router.get('/', homeController.getHomePage);
// Define other routes using controllers

router.get('/dashboard', dashBoard)

module.exports = router;
