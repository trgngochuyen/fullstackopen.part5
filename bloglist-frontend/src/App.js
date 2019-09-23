import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Render all the blogs
  useEffect(() => {
    blogService.getAll().then(response => {
      setBlogs(response)
      console.log(response)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('mot')
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }

  }
  
  const showBlogs = () => {
    console.log('hai')
    console.log('ba')
    return blogs.map(blog => 
    <Blog key={blog.id} blog={blog} />)
  }
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  
  return (
    <div>
      <h1>Blogs</h1>
      <h2>Login</h2>
      
      {user === null ? 
        <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} /> : 
        <div>
          <p>{user.name} logged in</p> 
          {showBlogs()}      
        </div>

      }
      
    </div>
  );
}

export default App
