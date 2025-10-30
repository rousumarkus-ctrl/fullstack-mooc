const router = require('express').Router();
const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const tokenExtractor = require('../util/token');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy();
    } else {
      res.status(403).end();
    }
  }
  res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();

    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  });
  res.json(blog);
});

router.get('/', async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
    },
    where,
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

module.exports = router;
