import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import {likeBlog, removeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const remove = () => {
        
    }
    return(
      <ul>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={() => 
              //dispatch(removeBlog(blog))
              dispatch(setNotification(`${blog.title} succesfully removed`, 5))
            }
            likeBlog= { () => 
                dispatch(likeBlog(blog))
                
            }
          />
        )}
      </ul>
    )
  }
  
export default BlogList