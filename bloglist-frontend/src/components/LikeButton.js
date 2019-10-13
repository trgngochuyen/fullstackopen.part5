import React from 'react'
import blogService from '../services/blogs'

const LikeButton = ({blog, blogLikes, setLikes}) => {

    const handleLikeClick = async (event) => {
        event.preventDefault()
        let number = Number(blogLikes)
        const blogObject = {
          user: blog.user.id,
          likes: number+=1,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        }
        
        try{
          await blogService.update(blog.id, blogObject)
          setLikes(blogObject.likes)
          
        } catch (exception) {
          console.log(exception)
        }
    }
    return (
        <button onClick={handleLikeClick}>Like</button>
    )
}

export default LikeButton