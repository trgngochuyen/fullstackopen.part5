import React from 'react'

const Blog = ({ blog }) => {
  return (
    <p className='blog'>
      {blog.title} {blog.author}
    </p>
  )
} 
  

export default Blog