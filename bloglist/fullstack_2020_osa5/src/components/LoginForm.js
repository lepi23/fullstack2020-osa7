import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {login} from '../reducers/loginReducer'

const LoginForm = ({
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    const dispatch = useDispatch()
    const handleLogin  = async (event) => {
        event.preventDefault()
        dispatch(login(username, password))
    } 
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit = {handleLogin}>
                <div>
                username:
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                password:
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button type='submit' id='login-button'>login</button>
                </div>
            </form>
        </div>
    )
}
LoginForm.propTypes = {
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
export default LoginForm
