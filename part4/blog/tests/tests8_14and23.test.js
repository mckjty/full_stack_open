const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = await helper.initialUser()
  const savedUser = await User.create(user)
  id = savedUser._id
  
  await Blog.insertMany(helper.initialBlogs(id))

  const loginResponse = await api
  .post('/api/login')
  .send({ username: 'testuser', password: 'test' })

  token = loginResponse.body.token
})

// tests

test('4.8 - blog list app returns correct number of blog posts', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs(id).length)
})

test('4.9 - returned unique identifier is named id, not _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.strictEqual(typeof blog.id, 'string')
    assert.strictEqual(blog._id, undefined)
  })
})

test('4.10 - a blog can be added', async () => {
  
  const newItem =  {
    title: 'Narnia',
    author: 'Jack Sparrow',
    url: "http://facebook.com",
    likes: 10,
    user: id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  assert.strictEqual(updatedBlogs.length, helper.initialBlogs(id).length + 1)

  const contents = updatedBlogs.map(n => n.title)
  assert(contents.includes('Narnia'))
})

test('4.11 - if likes property missing, it defaults to 0', async () => {
  const newItem =  {
    title: 'Narnia',
    author: 'Jack Sparrow',
    url: "http://facebook.com",
    user: id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  const likes = updatedBlogs.find(n => n.title === 'Narnia').likes
  assert.strictEqual(likes, 0)
})

describe('4.12 - checking if empty title or url are handled properly', () => {
test('if title property missing, 400 is returned', async () => {
  const newItem =  {
    author: 'Jack Sparrow',
    url: "http://facebook.com",
    likes: 12,
    user: id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem)
    .expect(400)
})

test('if url property missing, 400 is returned', async () => {
  const newItem =  {
    title: 'Narnia',
    author: 'Jack Sparrow',
    likes: 12,
    user: id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem)
    .expect(400)
})
})

test('4.13 - single blog post is sucessfully deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const itemToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${itemToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map(n => n.title)
      assert(!contents.includes(itemToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs(id).length - 1)
    })
describe('4.14 - checking if fields can be changed', () => {
  test('likes can be successfully changed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const itemToChange = blogsAtStart[0]

      const newData = {
        title: itemToChange.title,
        author: itemToChange.author,
        url: itemToChange.url,
        likes: itemToChange.likes + 2,
        user: id
      }

      await api
        .put(`/api/blogs/${itemToChange.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newData)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedItem = blogsAtEnd.find(n => n.id === itemToChange.id)
      assert.strictEqual(updatedItem.likes, itemToChange.likes + 2)

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

      test('title can be successfully changed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const itemToChange = blogsAtStart[0]

      const newData = {
        title: "Great Gatsby",
        author: itemToChange.author,
        url: itemToChange.url,
        likes: itemToChange.likes,
        user: id
      }

      await api
        .put(`/api/blogs/${itemToChange.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newData)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedItem = blogsAtEnd.find(n => n.id === itemToChange.id)
      assert.strictEqual(updatedItem.title, 'Great Gatsby')

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

  test('author can be successfully changed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const itemToChange = blogsAtStart[0]

      const newData = {
        title: itemToChange.title,
        author: "Gustav Flaubert",
        url: itemToChange.url,
        likes: itemToChange.likes,
        user: id
      }

      await api
        .put(`/api/blogs/${itemToChange.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newData)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedItem = blogsAtEnd.find(n => n.id === itemToChange.id)
      assert.strictEqual(updatedItem.author, 'Gustav Flaubert')

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  
    test('url can be successfully changed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const itemToChange = blogsAtStart[0]

      const newData = {
        title: itemToChange.title,
        author: itemToChange.author,
        url: "https://disney.com",
        likes: itemToChange.likes,
        user: id
      }

      await api
        .put(`/api/blogs/${itemToChange.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newData)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedItem = blogsAtEnd.find(n => n.id === itemToChange.id)
      assert.strictEqual(updatedItem.url, "https://disney.com")

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  
  })

test('4.23 - adding blog fails with 401 if no valid token is provided', async () => {
   const newItem =  {
    title: 'Narnia',
    author: 'Jack Sparrow',
    url: "http://facebook.com",
    likes: 10,
    user: id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer incorrecttoken`)
    .send(newItem)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  assert.strictEqual(updatedBlogs.length, helper.initialBlogs(id).length)

  const contents = updatedBlogs.map(n => n.title)
  assert(!contents.includes('Narnia'))
})

// end of tests

after(async () => {
  await mongoose.connection.close()
})