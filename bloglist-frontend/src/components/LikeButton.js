import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

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
LikeButton.propTypes = {
  blog: PropTypes.object.isRequired,
  blogLikes: PropTypes.number.isRequired,
  setLikes: PropTypes.func.isRequired
}

export default LikeButton