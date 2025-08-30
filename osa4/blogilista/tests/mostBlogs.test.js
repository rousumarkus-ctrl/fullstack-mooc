const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlog,singleBlog,multipleBlogs } = require('./test_helper')

describe('most blogs',() => {
  test('of empty list is undefined',() => {
    const result = listHelper.mostBlogs(emptyBlog)
    assert.deepStrictEqual(result, undefined)
  })
  test('when list has only one blog get that author',() => {
    const result = listHelper.mostBlogs(singleBlog)
    assert.deepStrictEqual(result, { author:'Edsger W. Dijkstra',blogs:1 })
  })
  test('of a bigger list get the author with most blogs',() => {
    const result = listHelper.mostBlogs(multipleBlogs)
    assert.deepStrictEqual(result, { author:'Robert C. Martin',blogs:3 })
  })
})