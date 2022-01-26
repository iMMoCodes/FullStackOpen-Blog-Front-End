import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { setToken, getAll } from './services/blogs'
import { login } from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('Wrong username or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  blogs.sort(function (a, b) {
    return a.likes - b.likes
  })

  if (user === null) {
    return (
      <>
        <div>
          <h2>Log in to application</h2>
          {errorMsg && <h3 style={{ color: 'red' }}>{errorMsg}</h3>}
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>blogs</h1>
      {notification && <h2>{notification}</h2>}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>{user.name} logged in</h4>
        <button style={{ marginLeft: 5, height: 25 }} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm setNotification={setNotification} blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default App
