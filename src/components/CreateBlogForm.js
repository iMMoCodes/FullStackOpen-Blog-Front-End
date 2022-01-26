import React from 'react'
import { create } from '../services/blogs'

const CreateBlogForm = ({
  blogTitle,
  blogAuthor,
  blogUrl,
  setNotification,
  setBlogTitle,
  setBlogAuthor,
  setBlogUrl,
  setCreateBlogVisible,
}) => {
  const handleCreateBlog = (e) => {
    e.preventDefault()
    if (blogTitle && blogAuthor && blogUrl) {
      create({ title: blogTitle, author: blogAuthor, url: blogUrl })
      setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setCreateBlogVisible(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      setNotification(`Please fill all the fields to add a blog`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
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
  )
}

export default CreateBlogForm
