const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlog,singleBlog,multipleBlogs } = require('./test_helper')

describe('most likes',() => {
  test('of empty list is undefined',() => {
    const result = listHelper.mostLikes(emptyBlog)
    assert.deepStrictEqual(result, undefined)
  })
  test('when list has only one blog get that author',() => {
    const result = listHelper.mostLikes(singleBlog)
    assert.deepStrictEqual(result, { author:'Edsger W. Dijkstra',likes:5 })
  })
  test('of a bigger list get the author with most likes',() => {
    const result = listHelper.mostLikes(multipleBlogs)
    assert.deepStrictEqual(result, { author:'Edsger W. Dijkstra',likes:17 })
  })
})