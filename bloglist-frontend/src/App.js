import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    let isSubscribed = true

    blogService.getAll().then(response => {
      if (isSubscribed) {
        setBlogs(response)
      }
    }).catch(ex => console.error(ex))
    return () => isSubscribed = false
  }, [])
  
  const notification = (color, message) => {
    setMessage(message)
    setColor(color)
    setTimeout(() => {setMessage(null)}, 5000)
  }
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
      notification('green', `${username} successfully logged in`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notification('red', 'Wrong username or password')
      console.log(exception)
    }

  }
  
  const handleLogout = async (event) => {
  event.preventDefault()
  window.localStorage.clear()
  setUser(null)
  return window.location.reload()
  }
  
  const sorted = blogs.sort((a, b) => a.likes - b.likes)
  const result = sorted.map((blog,i) => <Blog key={i} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>)

  return (
    <div>
      <h1>Blogs</h1>
      <Message message={message} color={color}/>
      <h2>Login</h2>
      
      {user === null ? 
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> : 
        <div>
          <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p> 
          
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm blogs={blogs} setBlogs={setBlogs} notification={notification} blogFormRef={blogFormRef}/>
          </Togglable>
          {result}
        </div>

      }
      
    </div>
  );
}

export default App
