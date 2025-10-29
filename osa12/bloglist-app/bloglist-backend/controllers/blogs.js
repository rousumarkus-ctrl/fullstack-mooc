const blogsRouter =  require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1,name:1,id:1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const user = request.user

  if (!request.token) {
    return response.status(401).json({ error: 'no token' })
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title:body.title,
    url:body.url,
    likes:body.likes,
    author:body.author,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()


  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!request.token) {
    return response.status(401).json({ error: 'no token' })
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }else{
    response.status(403).json({ error: 'not authorized to delete other users blogs' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.likes = likes
  const updatedBlog = await blog.save(blog)
  response.json(updatedBlog)
})

module.exports = blogsRouter