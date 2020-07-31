import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import RenderUserInfo from './components/RenderUserInfo'
import Togglable from './components/Togglable'
import {setNotification} from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dispatch(initializeBlogs())
      }, [dispatch])

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            dispatch(setNotification(`${user.username} logged in succesfully`, 5))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 5))
            setTimeout(() => {
            }, 5000)
        }
    }
    const handleLogout = async (event) => {
        event.preventDefault()
        localStorage.clear()
        dispatch(setNotification(`logout ${user.username} succesfully`, 5))
        setUser(null)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`, 5))
                //notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`,'success')
            })
    }
    const like = (id) => {
        const blog = blogs.find(n => n.id === id)

        const changedBlog =
    {
        user:blog.user.id,
        likes: blog.likes +1,
        author:blog.author,
        title:blog.title,
        url: blog.url
    }
        blogService
            .update(id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                dispatch(setNotification('error like not subscribed', 5))
                //notifyWith('error like not subscribed')                  
            })
    }
    //blogin poisto luettelosta
    const removeBlog = (id) => {
        const blog = blogs.find(n => n.id === id)
        console.log(blog)
        blogService.remove(id)
        const newBlogs = blogs.filter(blog => blog.id.toString() !== id)
        setBlogs(newBlogs)
        dispatch(setNotification(`${blog.title} succesfully removed`, 5))
        //notifyWith(`${blog.title} succesfully removed`)

    }
    if (user === null) {
        return (
            <div>

                <Notification />

                <LoginForm
                    login={handleLogin}
                    username={username}
                    handleUsernameChange={handleUsernameChange}
                    password={password}
                    handlePasswordChange={handlePasswordChange}
                />
            </div>
        )
    }
    return (
        <div>
            <Notification />
            <h2>blogs</h2>
            <RenderUserInfo user = {user} handleLogout = {handleLogout}/>
            <Togglable buttonLabel ='new blog' ref={blogFormRef}>
                <BlogForm
                    createNewBlog={addBlog}
                />
            </Togglable>
            <BlogList/>
        </div>
    )
}

export default App