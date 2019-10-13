import React, { useState } from 'react'
import LikeButton from './LikeButton'


const Blog = ({ blog }) => {
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
        </div>
      </div>
    )
  
} 
  

export default Blog