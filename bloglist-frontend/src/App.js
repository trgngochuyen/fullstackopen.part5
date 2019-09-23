import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Render all the blogs
  /*useEffect(() => {
    let isSubscribed = true

    blogService.getAll().then(response => {
      if (isSubscribed) {
        setBlogs(response)
        console.log(response)
      }
    }).catch(ex => console.error(ex))
    return () => isSubscribed = false
    })
  */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    let isSubscribed = true

    blogService.getAll().then(response => {
      if (isSubscribed) {
        setBlogs(response)
        console.log(response)
      }
    }).catch(ex => console.error(ex))
    return () => isSubscribed = false
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('mot')
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('hai')
     window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      console.log('ba')
      blogService.setToken(user.token)
      setUser(user)
      console.log('bon')
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }

  }
  
  const handleLogout = async (event) => {
  event.preventDefault()
  window.localStorage.clear()
  setUser(null)
  return window.location.reload()
  }
  return (
    <div>
      <h1>Blogs</h1>
      <h2>Login</h2>
      
      {user === null ? 
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> : 
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p> 
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />)}      
        </div>

      }
      
    </div>
  );
}

export default App
