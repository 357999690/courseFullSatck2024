import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('title')


  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a blog...')

  // const inputUrl = screen.getAllByPlaceholderText('url')
  // await user.type(inputUrl, 'testing a blog...')
  await user.click(sendButton)

  // console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a blog...')
})