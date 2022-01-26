import React, { useState } from 'react'
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

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleClick}>{buttonText}</button>
        {buttonText === 'hide' && (
          <>
            <p>URL : {blog.url}</p>
            <p>
              Likes : {blog.likes} <button>Like</button>
            </p>
            <p>User: {blog.user.name}</p>
          </>
        )}
      </div>
    </>
  )
}

export default Blog
