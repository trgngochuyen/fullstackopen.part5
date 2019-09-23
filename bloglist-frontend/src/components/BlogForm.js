import React from 'react'

const BlogForm = ({addBlog, newBlog, handleBlogChange}) => {
    return(
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
    )
}

export default BlogForm