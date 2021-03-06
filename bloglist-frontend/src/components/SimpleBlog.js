import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div className='blogRender'>
        <div>
            {blog.title} {blog.author}
        </div>
        <div>
            blog has {blog.likes} likes
            <button onClick={onClick}>Like</button>
        </div>
    </div>
)

export default SimpleBlog