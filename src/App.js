import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { setToken, getAll } from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs))
  }, [blogs, user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username,
        password,
      })
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <>
        <div>
          <h2>Log in to application</h2>
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
    <div>
      <h1>blogs</h1>
      <h4>{user.name} logged in</h4>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
