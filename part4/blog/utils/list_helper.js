const Blog = require('../models/blog')

// helper functions for ex 4.1 - 4.7

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(b => b.likes)

    return likesArray.length === 0
        ? 0
        : likesArray.reduce((sum, item) => {return sum + item}, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }
    return blogs.reduce((max, next) => 
        next.likes > max.likes ? next : max
    )
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }
    
    const authorList = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    return Object.entries(authorList).reduce((max, [author, count]) => {
        return count > max.blogs ? {author: author, blogs: count} : max
    }, {author: null, blogs: 0})
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }

    const likesList = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})
    
    return Object.entries(likesList).reduce(
        (max, [author, likes]) => {
            return likes > max.likes ? {author, likes} : max
        }, {author: null, likes: 0}
    )
}

// helper functions for ex 4.8 - 4.12

const initialBlogs = [
  {
    title: 'Lord of the Rings',
    author: 'John Doe',
    url: "http://google.com",
    likes: 15
  },
  {
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: "http://netflix.com",
    likes: 19
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// exports

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes,
  initialBlogs,
  blogsInDb
}
