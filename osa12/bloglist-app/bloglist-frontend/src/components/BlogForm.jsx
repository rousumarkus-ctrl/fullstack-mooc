import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title:title,
      author:author,
      url:url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input value={title} onChange={handleTitleChange}></input>
        </label>
      </div>
      <div>
        <label>
          author
          <input value={author} onChange={handleAuthorChange}></input>
        </label>
      </div>
      <div>
        <label>
          url
          <input value={url} onChange={handleUrlChange}></input>
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm