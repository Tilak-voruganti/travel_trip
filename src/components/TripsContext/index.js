import {createContext} from 'react'

const TripsContext = createContext({
  trips: [],
  addTrip: () => {},
  cancelTrip: () => {},
})

export default TripsContext