import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({blogs, setBlogs, setErrorMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
            likes: 0
        }
        try {
            const addedBlog = await blogService.addBlog(newBlog)
            setBlogs(blogs.concat(addedBlog))
            setAuthor('')
            setTitle('')
            setUrl('')
            setErrorMessage(`A new blog ${title} by ${author} was added`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch {
            setErrorMessage('Blog was not added')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
         <><h2>Create new</h2><form onSubmit={handleNewBlog}>
            <div>
                <label>
                    title:
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    author:
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    url:
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                </label>
            </div>
            <button type="submit">create</button>
        </form></>
    )
}

export default CreateBlog