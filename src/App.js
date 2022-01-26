import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { setToken, getAll, create } from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs))
  }, [blogs, user])

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
      setErrorMsg('Wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = (e) => {
    e.preventDefault()
    create({ title: blogTitle, author: blogAuthor, url: blogUrl })
  }

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>{user.name} logged in</h4>
        <button style={{ marginLeft: 5, height: 25 }} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div style={{ marginBottom: 50 }}>
        <h1>Create new</h1>
        <form onSubmit={handleCreateBlog}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ width: 50 }}>Title:</p>
            <input
              style={{ height: 20 }}
              type='text'
              value={blogTitle}
              name='Title'
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ width: 50 }}>Author:</p>
            <input
              style={{ height: 20 }}
              type='text'
              value={blogAuthor}
              name='Author'
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ width: 50 }}>Url:</p>
            <input
              style={{ height: 20 }}
              type='text'
              value={blogUrl}
              name='Url'
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>

          <button>Create</button>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
