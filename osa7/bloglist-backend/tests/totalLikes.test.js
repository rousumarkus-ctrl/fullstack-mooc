const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlog, singleBlog, multipleBlogs } = require('./test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlog)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(singleBlog)
    assert.strictEqual(result, singleBlog[0].likes)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = multipleBlogs

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(
      result,
      blogs[0].likes +
        blogs[1].likes +
        blogs[2].likes +
        blogs[3].likes +
        blogs[4].likes +
        blogs[5].likes
    )
  })
})
