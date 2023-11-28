const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const allPostData = await Post.findAll({
            include: [{ model: User }]
        });
        
        res.status(200).json(allPostData);
    } catch (err) {

        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const packagesData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    include: 'username'

                }
            ]
        })

        res.status(200).json(packagesData)
    } catch (err) {
        // console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
  try {
        const newPost = await Post.create({
            ...req.body,
              user_id: req.session.user_id,
              });


        res.status(200).json(newPost);
  } catch (err) {
      res.status(500).json(err);
console.error(err)
  }
});

router.put('/:id', withAuth, async (req, res) => {

    try {
        const updatedPost = await Post.update(
            {
                id: req.body.id,
                post_title: req.body.post_title,
                post_content: req.body.post_content
            },
            {
                where: {
                    id: req.params.id,
                }

            })

        res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json(err);
            console.error(err)
        }

});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: { id: req.params.id }
        });
        if (!deletePost) {
            res.status(404).json({ message: 'Post not found.' });
            return;
        }

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;