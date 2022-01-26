import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
  expect(component.container).not.toHaveValue(0)
})
