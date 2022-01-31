import React, { useState } from 'react'

const BlogForm = ({ setNotification, blogFormRef, create }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateBlog = (e) => {
    e.preventDefault()
    if (blogTitle && blogAuthor && blogUrl) {
      create({ title: blogTitle, author: blogAuthor, url: blogUrl })
      setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      setNotification('Please fill all the fields to add a blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div style={{ marginBottom: 10 }} className='formDiv'>
      <h1>Create new</h1>
      <form onSubmit={handleCreateBlog} className='blogForm'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ width: 50 }}>Title:</p>
          <input
            style={{ height: 20 }}
            type='text'
            id='title'
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
            id='author'
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
            id='url'
            value={blogUrl}
            name='Url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>

        <button id='create-blog-button'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
