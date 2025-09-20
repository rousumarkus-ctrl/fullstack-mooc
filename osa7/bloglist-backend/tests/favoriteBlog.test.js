const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlog, singleBlog, multipleBlogs } = require('./test_helper')

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog(emptyBlog)
    assert.deepStrictEqual(result, undefined)
  })
  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(singleBlog)
    assert.deepStrictEqual(result, singleBlog[0])
  })
  test('of a bigger list get the most liked one', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    assert.deepStrictEqual(result, multipleBlogs[2])
  })
})
