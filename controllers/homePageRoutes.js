const router = require('express').Router(); 
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', withAuth, async (req, res) => {
  

		res.render('homepage', {

		
			logged_in: req.session.logged_in
		});

});
router.get('/posts/:id', async (req, res) => {
	const postById = await Post.findByPk(req.params.id, {
		
		include: [
			{
				model: User,
				attributes: ['username'] // may change based on seeds file 
			}
		]
	});
	const postByIdData = postById.get({ plain: true });
	res.render('homepage', {
		...postByIdData,
		logged_in: req.session.logged_in
	});
});


router.get('/homepage', withAuth, async (req, res) => { 
    console.log(req.session)
    try {
        const post = await Post.findAll({

            where: { user_id: req.session.user_id }

        });
        console.log(post)
        console.log(5);

        const userPost = post.map((posts) =>
            posts.get({ plain: true })
        );  
        // try {
        const mostRecent = userPost.pop()
		const userProfile = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{model: Post}]
    })
        // console.log(userProfile)
    const profileData = userProfile.get({ plain: true });
    
    res.render('homepage', { 
        ...profileData, 
        userPost, 
        mostRecent,
        logged_in: true
    })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/homepage');
		return;
	}

	res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
    res.render('dashboard', {


        logged_in: req.session.logged_in
    });
});

//todo do this but with posts for homepage??
router.post('/showSaved', withAuth, async (req, res) => {
    // console.log('@@@@@@@@@@@@@@@@@@@@@')
    // console.log(req.body.id)
    try {
        const post = await Post.findAll({

            where: { user_id: req.session.user_id }

        });
        console.log(post)
        console.log(4)

        const userPost = post.map((posts) =>
            posts.get({ plain: true })
        );  
        const showPost = await Post.findOne({
            where: { id: req.body.id
            },
            attributes: ['post_title', 'post_content']
        });

        if (showPost) {
            const mostRecent = showPost.get({ plain: true });
console.log(mostRecent)
const userProfile = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{model: Post}]
})
    // console.log(userProfile)
const profileData = userProfile.get({ plain: true });
            res.render('saved', {
                ...profileData,
                userPost,
                mostRecent,
                logged_in: true
            });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/renderPost', withAuth, async (req, res) => {
    try {
        const showPost = await Post.findOne({
            where: {
                user_id: req.session.user_id,
                post_title: req.body.post_title,
                post_content: req.body.post_content
            },
            attributes: ['post_title', 'post_content']
        });
        console.log(3)
        if (showPost) {
            const inputPostData = showPost.get({ plain: true });
console.log(inputPostData)
            res.render('homepage', {
                ...inputPostData,
                logged_in: true
            });
        } else {
            // Handle the case where no record was found
            // You might want to redirect or render an error page
            res.status(404).send("Title not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
  let newPost = req.body;
  newPost.user_id = req.session.user_id;
  console.log(2)
  try {
      await Post.create(newPost);
      // Fetch the updated data from the database
      const updatedData = await Post.findOne({
          where: {
              user_id: req.session.user_id,
              post_title: req.body.post_title,
              post_content: req.body.post_content
          },
          attributes: ['post_title', 'post_content', 'user_id']
      });

      if (updatedData) {
          const inputPostData = updatedData.get({ plain: true });
          // Render the homepage with the updated data
          res.render('homepage', {
              ...inputPostData,
              logged_in: true
          });
      } else {
          // Handle the case where no record was found
          res.status(404).send("Title not found");
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;