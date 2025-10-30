const { Op } = require('sequelize');
const { Session } = require('../models');
const { SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.token = authorization.substring(7);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      console.log(req.token);
      const session = await Session.findOne({
        where: { token: { [Op.like]: req.token } },
      });
      console.log(session);
      if (!session) {
        return res.status(401).json({ error: 'token session not saved' });
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

module.exports = tokenExtractor;
