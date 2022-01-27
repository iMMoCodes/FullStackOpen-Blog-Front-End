import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'some title',
    author: 'testAuthor',
    url: 'testurl@test.com',
    likes: 0,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('some title')
  expect(component.container).toHaveTextContent('testAuthor')
  expect(component.container).not.toHaveTextContent('testurl@test.com')
  expect(component.container).not.toHaveTextContent('Likes')
})

test('url and likes show after button clicked', async () => {
  const blog = {
    title: 'some title',
    author: 'testAuthor',
    url: 'testurl@test.com',
    likes: 0,
    user: {
      name: 'test',
      username: 'test',
    },
  }
  const user = {
    username: 'test',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleClick={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('testurl@test.com')
  expect(component.container).toHaveTextContent('Likes')
})

test('clicking the like button twice makes two calls', async () => {
  const blog = {
    title: 'some title',
    author: 'testAuthor',
    url: 'testurl@test.com',
    likes: 0,
    user: {
      name: 'test',
      username: 'test',
    },
  }

  const likeHandler = jest.fn()

  const component = render(
    <div className='blog'>
      {blog.title} {blog.author}
      <p>URL : {blog.url}</p>
      <p>
        Likes : {blog.likes}{' '}
        <button onClick={likeHandler} className='likeButton'>
          Like
        </button>
      </p>
      <p>User: {blog.user.name}</p>
    </div>
  )

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})
