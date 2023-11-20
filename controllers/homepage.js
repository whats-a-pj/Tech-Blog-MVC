const Post = require('../models/post');

const homeController = {
  async getHomePage(req, res) {
    try {
      const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
      res.render('home', { posts });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = homeController;
