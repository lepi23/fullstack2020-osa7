import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
  })
export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))