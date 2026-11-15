import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const {history} = props
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (e) {
      setErrorMsg('Something went wrong')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="logo-text">Travel Trip</h1>
        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <div className="password-container">
            <input type={showPassword ? 'text' : 'password'} id="password"
              value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" data-testid="show-password"
              onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="submit-btn">Login</button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login