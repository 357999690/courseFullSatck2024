import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'



test('renders title and author', () => {
  const blog = {
    title: 'holiiis',
    author: 'holllis',
    ulr: 'holis',
    user:{
      name: 'lucas'
    }
  }

  const { container } = render(<Blog blog={blog}/>)

  const div = container.querySelector('.titleAuthor')

  expect(div).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  // const element = screen.getByText(`${blog.title} ${blog.author}`)

  // expect(element).toBeDefined()
})

// describe('<Togglable />', () => {
//     let container

//     beforeEach(() => {
//         container = render(

//         )
//     })
// })

test('renders likes and url', async () => {
  const blog = {
    title: 'holiiis',
    author: 'holllis',
    url: 'holis',
    likes: 1,
    user:{
      name: 'lucas'
    }
  }

  const { container } = render(<Blog blog={blog}/>)

  // const div = container.querySelector('.titleAuthor')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  // screen.debug(button)
  await user.click(button)

  const url = container.querySelector('#url-text')
  // screen.debug(div)


  // const url = container.querySelector('#url-text')
  // screen.debug(url)
  expect(url).toHaveTextContent(
    `${blog.url}`
  )

  const likes = container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    `likes ${blog.likes}`
  )
})

test('likes clicks', async () => {
  const blog = {
    title: 'holiiis',
    author: 'holllis',
    url: 'holis',
    likes: 1,
    user:{
      name: 'lucas'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})