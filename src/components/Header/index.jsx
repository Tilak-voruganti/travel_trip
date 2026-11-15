import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1 className="logo-text">Travel Trip</h1>
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/my-trips" className="nav-link">My Trips</Link>
        </li>
        <li>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)