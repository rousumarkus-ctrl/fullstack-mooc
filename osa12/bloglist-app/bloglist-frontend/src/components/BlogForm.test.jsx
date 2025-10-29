import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testTitle')
  await user.type(authorInput, 'testAuthor')
  await user.type(urlInput, 'testUrl')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
})