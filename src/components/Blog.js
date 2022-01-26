import React, { useState } from 'react'
import { update } from '../services/blogs'
const Blog = ({ blog }) => {
  const [buttonText, setButtonText] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = () => {
    buttonText === 'view' ? setButtonText('hide') : setButtonText('view')
  }

  const handleLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    update(blogObject, blog.id)
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button
          onClick={handleClick}
          style={{ marginLeft: 10, marginBottom: 5 }}
        >
          {buttonText}
        </button>
        {buttonText === 'hide' && (
          <>
            <p>URL : {blog.url}</p>
            <p>
              Likes : {blog.likes} <button onClick={handleLike}>Like</button>
            </p>
            <p>User: {blog.user.name}</p>
          </>
        )}
      </div>
    </>
  )
}

export default Blog
