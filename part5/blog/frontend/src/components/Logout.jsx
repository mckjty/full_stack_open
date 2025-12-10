const Logout = ({user, setUser, setErrorMessage}) => {
    
    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogAppUser')
            setUser(null)
        } catch {
            setErrorMessage('no user logged in')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    
    return (
        <div>
            <p>{user.name} logged in</p>
            <form onSubmit={handleLogout}>
                <button type="submit">logout</button>
            </form>
        </div>

    )
}

export default Logout