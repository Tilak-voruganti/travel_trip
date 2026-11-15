import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-content">
      <h1>Travel. Relax. Memories.</h1>
      <p>With travel trip you can experience the world easily and securely.</p>
      <Link to="/book-a-new-trip">
        <button type="button">Book a new trip</button>
      </Link>
    </div>
  </div>
)

export default Home