import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} />
      {!user && <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage} />}
      {user && (
        <div>
          <Logout user={user} setUser={setUser} setErrorMessage={setErrorMessage} />
          <CreateBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>
      )}
    </div>
  )
}

export default App