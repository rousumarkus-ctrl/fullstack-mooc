import { Tab, TableCell, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blog = props.blog

  return (
    <TableRow>
      <TableCell>
        <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>{blog.user.name}</TableCell>
    </TableRow>
  )
}

export default Blog
