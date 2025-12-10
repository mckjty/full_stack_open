import blogService from '../services/blogs'
import { useEffect } from 'react'

const BlogList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </>
  )
}

export default BlogList