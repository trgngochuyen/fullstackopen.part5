import React, { useState } from 'react'
import LikeButton from './LikeButton'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [expand, setExpand] = useState(false)
  let [blogLikes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    
  }
  
  const hideOrShow = { display: expand ? '' : 'none'}

  const blogClicked = () => {
    setExpand(!expand)
  }
 
  const removeButtonStyle = {display: blog.user.username===user.username ? '' : 'none'}

  const removeBlog = () => {
    try {
      const id = blog.id
      if (window.confirm(`Delete ${id}?`)) {
        blogService.remove(id)
      setBlogs(blogs.filter((blog) => {
        return blog.id.toString() !== id
      }))
      }
      return null
    } catch (exception) {
      console.log(exception)
    }

  } 

    return (
      <div  style={blogStyle}>
        <div onClick={() => blogClicked() }>
          <p>{blog.title}</p> 
          <p>{blog.author}</p>
        </div>
        <div style={hideOrShow}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blogLikes} likes <LikeButton blog={blog} blogLikes={blogLikes} setLikes={setLikes} /></p>
          <p>added by {blog.author}</p>
          <button style={removeButtonStyle} onClick={() => removeBlog()}>Remove</button>
        </div>
      </div>
    )
  
} 
  
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog