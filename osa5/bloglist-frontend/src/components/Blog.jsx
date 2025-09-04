import { useState, useImperativeHandle } from 'react'

const Blog = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blog = props.blog
  const [detailed, setDetailed] = useState(false)

  const toggleDetailed = () => {
    setDetailed(!detailed)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleDetailed }
  })

  const newBlog = event => {
    event.preventDefault()
    const liked = {
      title:blog.title,
      likes:blog.likes+1,
      author:blog.author,
      user:blog.user,
      url:blog.url
    }
    props.updateBlog(blog.id,liked)
  }

  const removeBlog = event => {
    event.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      props.deleteBlog(blog.id)
    }
  }


  if (detailed) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleDetailed}>hide</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>likes {blog.likes} <button onClick={newBlog}>like</button></div>
        <div>{blog.user.name}</div>
        {(props.user && props.user.username === blog.user.username) && <button onClick={removeBlog}>remove</button> }
      </div>
    )
  }else{
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleDetailed}>view</button>
      </div>
    )
  }
}

export default Blog