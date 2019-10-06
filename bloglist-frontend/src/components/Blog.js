import React, { useState } from 'react'


const Blog = ({ blog }) => {
  const [expand, setExpand] = useState(false)

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
      <div style={blogStyle}>
        <div onClick={() => blogClicked() }>
          {blog.title} {blog.author}
        </div>
        <div style={hideOrShow}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} likes <button>like</button></p>
          <p>added by {blog.author}</p>
        </div>
      </div>
    )
  
} 
  

export default Blog