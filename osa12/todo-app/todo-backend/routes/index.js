const express = require('express')
const redis = require('../redis')
const router = express.Router()

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (req, res) => {
  const result = await redis.getAsync('added')
  res.send({ added_todos: result })
})

module.exports = router
