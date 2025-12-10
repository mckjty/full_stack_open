import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({username, setUsername, password, setPassword, setUser, setErrorMessage}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <><h2>Login</h2><form onSubmit={handleLogin}>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                </label>
            </div>
            <button type="submit">login</button>
        </form></>
    )
}

export default Login