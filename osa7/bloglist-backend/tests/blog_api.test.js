const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  multipleBlogs,
  extraBlog,
  noLikesBlog,
  noTitleBlog,
  noUrlBlog,
  blogsInDb,
  usersInDb,
} = require('./test_helper')

const api = supertest(app)

describe('initial blogs', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    await Blog.deleteMany({})
    for (const single of multipleBlogs) {
      single.user = user.id
      const blogObject = new Blog(single)
      await blogObject.save()
    }
  })

  describe('blog get', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, 6)
    })

    test('a specific blogs is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const contents = response.body.map((e) => e.title)
      assert.strictEqual(
        contents.includes('Go To Statement Considered Harmful'),
        true
      )
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, multipleBlogs.length)
    })

    test('id is in id', async () => {
      const response = await api.get('/api/blogs')
      assert('id' in response.body[0])
      assert(!('_id' in response.body[0]))
    })
  })

  describe('blog addition', () => {
    test('a valid blog can be added ', async () => {
      const token = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      const blogsAtStart = await blogsInDb()
      await api
        .post('/api/blogs')
        .send(extraBlog)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      const contents = blogsAtEnd.map((r) => r.title)
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
      assert(contents.includes(extraBlog.title))
    })
    test('blog with no likes gets 0', async () => {
      const token = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      await api
        .post('/api/blogs')
        .send(noLikesBlog)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/blogs')
      const added = response.body.find((b) => b.title === noLikesBlog.title)
      assert.strictEqual(added.likes, 0)
    })
    test('blog with no title fails with 400', async () => {
      const token = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(400)
    })
    test('blog with no url fails with 400', async () => {
      const token = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(400)
    })
    test('fails with status 401 if no token', async () => {
      const blogsAtStart = await blogsInDb()
      await api.post('/api/blogs').send(extraBlog).expect(401)
      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('blog delete', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const token = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(204)
      const blogsAtEnd = await blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(!titles.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
    test('fails with status 401 if no token', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
      const blogsAtEnd = await blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(titles.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('blog put', () => {
    test('succeeds', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = 100
      const newBlog = { ...blogToUpdate, likes: newLikes }
      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)
      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(
        blogsAtEnd.find((blog) => blog.id === blogToUpdate.id).likes,
        newLikes
      )
    })
    test('wrong id fail with 400', async () => {
      const blogsAtStart = await blogsInDb()
      await api.put('/api/blogs/1').send(blogsAtStart[0]).expect(400)
    })
  })
})

describe('initial user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  describe('username', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        username: 'mrousu',
        name: 'Markus Rousu',
        password: 'salattu',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map((u) => u.username)
      assert(usernames.includes(newUser.username))
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salattu',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if no username', async () => {
      const usersAtStart = await usersInDb()
      const result = await api
        .post('/api/users')
        .send({ name: 'Test1', password: 'Test2' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
      assert(
        result.body.error.includes(
          'User validation failed: username: Path `username` is required.'
        )
      )
      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username too short', async () => {
      const usersAtStart = await usersInDb()
      const result = await api
        .post('/api/users')
        .send({ name: 'Test1', username: '12', password: '123' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
      assert(
        result.body.error.includes('is shorter than the minimum allowed length')
      )
      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
  describe('password', () => {
    test('creation fails with proper statuscode and message if no password', async () => {
      const usersAtStart = await usersInDb()
      const result = await api
        .post('/api/users')
        .send({ name: 'Test1', username: 'Test2' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
      assert(result.body.error.includes('no password'))
      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password too short', async () => {
      const usersAtStart = await usersInDb()
      const result = await api
        .post('/api/users')
        .send({ name: 'Test1', username: 'Test2', password: '12' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
      assert(
        result.body.error.includes('password must be at least 3 characters')
      )
      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
