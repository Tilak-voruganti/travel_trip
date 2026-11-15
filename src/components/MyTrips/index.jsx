import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import TripsContext from '../TripsContext'
import './index.css'

const MyTrips = () => {
  const {trips, cancelTrip} = useContext(TripsContext)

  return (
    <div className="my-trips-container">
      <Header />
      <div className="my-trips-content">
        {trips.length === 0 ? (
          <div className="no-trips">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-trips-img.png"
              alt="no trips"
            />
            <h1>No upcoming trips.</h1>
            <p>When you book a trip, you will see your trip details here</p>
            <Link to="/book-a-new-trip">
              <button type="button" className="book-trip-btn">
                Book a new trip
              </button>
            </Link>
          </div>
        ) : (
          <ul className="trips-list">
            {trips.map(trip => (
              <li key={trip.id} className="trip-card">
                <h1>{trip.endLocation}</h1>
                <p>{trip.startDate}</p>
                <p>{trip.endDate}</p>
                <button
                  type="button"
                  className="cancel-trip-btn"
                  onClick={() => cancelTrip(trip.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MyTrips