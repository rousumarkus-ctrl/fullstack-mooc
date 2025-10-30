const { Readinglist, User } = require('../models');
const { sequelize } = require('../util/db');
const tokenExtractor = require('../util/token');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const readinglist = await Readinglist.create(req.body);
  res.json(readinglist);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const readinglist = await Readinglist.findByPk(req.params.id);
  if (user.id === readinglist.userId) {
    readinglist.read = req.body.read;
    await readinglist.save();
    res.json(readinglist);
  } else {
    res.status(403).end();
  }
});

module.exports = router;
