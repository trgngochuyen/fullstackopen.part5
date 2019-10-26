import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, notification, blogFormRef}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()  
    const newBlog = {
      title,
      author,
      url
    }
    try {
      await blogService.create(newBlog)
      notification('green', `New blog ${title} was just created.`)
      setBlogs(blogs.concat(newBlog))
      setTitle("")
      setUrl("")
      setAuthor("")
    } catch (exception) {
      notification('red', 'Title and Url are required!')
      console.log(exception)
    }
    
  }
    return(
    <form onSubmit={addBlog}>
      <div>
        Title: 
        <input 
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: 
        <input 
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: 
        <input 
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
    )
}

export default BlogForm