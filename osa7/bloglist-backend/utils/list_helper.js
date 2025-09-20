const dummy = () => 1
const totalLikes = (blogs) => blogs.reduce((total, b) => total + b.likes, 0)
const favoriteBlog = (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)[0]
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const authors = Array.from(
    new Set([
      ...blogs.reduce((authors, blog) => authors.concat(blog.author), []),
    ])
  )
  const mostBlog = authors.toSorted(
    (a, b) =>
      blogs.filter((blog) => blog.author === b).length -
      blogs.filter((blog) => blog.author === a).length
  )[0]
  return {
    author: mostBlog,
    blogs: blogs.filter((blog) => blog.author === mostBlog).length,
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const authors = Array.from(
    new Set([
      ...blogs.reduce((authors, blog) => authors.concat(blog.author), []),
    ])
  )
  const mostLikes = authors.toSorted(
    (a, b) =>
      totalLikes(blogs.filter((blog) => blog.author === b)) -
      totalLikes(blogs.filter((blog) => blog.author === a))
  )[0]
  return {
    author: mostLikes,
    likes: totalLikes(blogs.filter((blog) => blog.author === mostLikes)),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
