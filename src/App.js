import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import BookANewTrip from './components/BookANewTrip'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import TripsContext from './components/TripsContext'
import './App.css'

export const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

export const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

const App = () => {
  const [trips, setTrips] = useState([])

  const addTrip = trip => setTrips(prev => [...prev, trip])
  const cancelTrip = id => setTrips(prev => prev.filter(t => t.id !== id))

  return (
    <TripsContext.Provider value={{trips, addTrip, cancelTrip}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/book-a-new-trip"
          component={BookANewTrip}
        />
        <ProtectedRoute exact path="/my-trips" component={MyTrips} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </TripsContext.Provider>
  )
}

export default App