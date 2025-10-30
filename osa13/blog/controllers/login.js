const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const User = require('../models/user');
const { Session } = require('../models');
const tokenExtractor = require('../util/token');

router.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === 'secret';

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ token });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.delete('/', tokenExtractor, async (req, res) => {
  const session = await Session.findOne({
    where: { token: req.token },
  });
  session.destroy();
  res.status(200).end();
});

module.exports = router;
