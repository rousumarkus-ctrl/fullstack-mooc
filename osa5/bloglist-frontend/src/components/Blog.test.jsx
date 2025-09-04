import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 123,
    user: {
      name: 'testName',
      username: 'testUsername',
      id: 'testID'
    }
  }
  render(<Blog blog={blog}></Blog>)
  const element = screen.getByText(
    'testTitle', { exact: false }
  )
  expect(element).toBeDefined()
})
test('renders url like and user when view pressed', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 123,
    user: {
      name: 'testName',
      username: 'testUsername',
      id: 'testID'
    }
  }
  render(<Blog blog={blog}></Blog>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const url = screen.getByText(
    'testUrl', { exact: false }
  )
  const likes = screen.getByText(
    '123', { exact: false }
  )
  const userTest = screen.getByText(
    'testName', { exact: false }
  )
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(userTest).toBeDefined()
})
test('pressing like 2 times calls function 2 times', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 123,
    user: {
      name: 'testName',
      username: 'testUsername',
      id: 'testID'
    }
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} updateBlog={mockHandler}></Blog>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})