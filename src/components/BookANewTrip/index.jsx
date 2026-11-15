import {useState, useContext} from 'react'
import Header from '../Header'
import TripsContext from '../TripsContext'
import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

const successImg =
  'https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png'

const BookANewTrip = () => {
  const {addTrip} = useContext(TripsContext)

  const [activeStepId, setActiveStepId] = useState('YOUR_DETAILS')
  const [name, setName] = useState('')
  const [startLocation, setStartLocation] = useState('')
  const [endLocation, setEndLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [travelAssistanceNeeded, setTravelAssistanceNeeded] = useState(false)
  const [travelAssistance, setTravelAssistance] = useState('Car')
  const [errorMessage, setErrorMessage] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleNextDetails = e => {
    e.preventDefault()
    if (!name.trim()) {
      setErrorMessage('Enter your name')
      return
    }
    if (!startLocation.trim()) {
      setErrorMessage('Enter your start location')
      return
    }
    if (!endLocation.trim()) {
      setErrorMessage('Enter your end location')
      return
    }
    setErrorMessage('')
    setActiveStepId('DATE_SELECTION')
  }

  const handleNextDates = e => {
    e.preventDefault()
    if (!startDate) {
      setErrorMessage('Select start date')
      return
    }
    if (!endDate) {
      setErrorMessage('Select end date')
      return
    }
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMessage('The end date cannot be less than the start date')
      return
    }
    setErrorMessage('')
    setActiveStepId('GUESTS')
  }

  const handleNextGuests = e => {
    e.preventDefault()
    setErrorMessage('')
    setActiveStepId('TRAVEL_ASSISTANCE')
  }

  const handleNextAssistance = e => {
    e.preventDefault()
    setErrorMessage('')
    setActiveStepId('CONFIRMATION')
  }

  const handleConfirm = () => {
    addTrip({
      id: Date.now(),
      name,
      startLocation,
      endLocation,
      startDate,
      endDate,
      adults,
      children,
      infants,
      travelAssistance: travelAssistanceNeeded ? travelAssistance : 'No',
    })
    setIsConfirmed(true)
  }

  const handleCancel = () => {
    setName('')
    setStartLocation('')
    setEndLocation('')
    setStartDate('')
    setEndDate('')
    setAdults(1)
    setChildren(0)
    setInfants(0)
    setTravelAssistanceNeeded(false)
    setTravelAssistance('Car')
    setErrorMessage('')
    setActiveStepId('YOUR_DETAILS')
  }

  const renderStepItem = (step, index) => {
    const isCurrent = activeStepId === step.stepId
    const activeIndex = stepsList.findIndex(s => s.stepId === activeStepId)
    const isCompleted = index < activeIndex

    return (
      <li key={step.stepId} className="step-item">
        {isCompleted ? (
          <img
            src={successImg}
            alt={step.displayText}
            className="completed-icon"
          />
        ) : (
          <p className={`step-number ${isCurrent ? 'active-step-num' : ''}`}>
            {index + 1}
          </p>
        )}
        <p className={`step-text ${isCurrent ? 'active-step-text' : ''}`}>
          {step.displayText}
        </p>
      </li>
    )
  }

  return (
    <div className="book-trip-container">
      <Header />
      <div className="book-trip-content">
        {isConfirmed ? (
          <div className="confirmed-container">
            <img src={successImg} alt="success" className="success-img" />
            <h1>Awesome</h1>
            <p>Your booking has been confirmed</p>
            <button
              type="button"
              className="book-trip-btn"
              onClick={() => {
                setIsConfirmed(false)
                handleCancel()
              }}
            >
              Book a New Trip
            </button>
          </div>
        ) : (
          <div className="booking-wizard">
            <ul className="steps-list">
              {stepsList.map((step, index) => renderStepItem(step, index))}
            </ul>

            <div className="form-container">
              {activeStepId === 'YOUR_DETAILS' && (
                <form onSubmit={handleNextDetails}>
                  <h1>
                    Your <span>Details</span>
                  </h1>
                  <p>Enter your name and location details</p>
                  <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="startLocation">Start Location</label>
                    <input
                      type="text"
                      id="startLocation"
                      value={startLocation}
                      onChange={e => setStartLocation(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="endLocation">End Location</label>
                    <input
                      type="text"
                      id="endLocation"
                      value={endLocation}
                      onChange={e => setEndLocation(e.target.value)}
                    />
                  </div>
                  {errorMessage && <p className="error-msg">{errorMessage}</p>}
                  <button
                    type="button"
                    onClick={handleNextDetails}
                    className="submit-btn"
                  >
                    Next
                  </button>
                </form>
              )}

              {activeStepId === 'DATE_SELECTION' && (
                <form onSubmit={handleNextDates}>
                  <h1>Date Selection</h1>
                  <p>Select your Start and End Date</p>
                  <div className="input-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                  {errorMessage && <p className="error-msg">{errorMessage}</p>}
                  <div className="btn-row">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => {
                        setErrorMessage('')
                        setActiveStepId('YOUR_DETAILS')
                      }}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextDates}
                      className="submit-btn"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {activeStepId === 'GUESTS' && (
                <form onSubmit={handleNextGuests}>
                  <h1>Guests</h1>
                  <p>Select your guests</p>
                  <div className="guest-row">
                    <div>
                      <p>Adults</p>
                      <p>Age 13 or above</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <p>{adults}</p>
                    <button
                      type="button"
                      onClick={() => setAdults(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="guest-row">
                    <div>
                      <p>Children</p>
                      <p>Age 2-12</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <p>{children}</p>
                    <button
                      type="button"
                      onClick={() => setChildren(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="guest-row">
                    <div>
                      <p>Infants</p>
                      <p>under 2</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInfants(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <p>{infants}</p>
                    <button
                      type="button"
                      onClick={() => setInfants(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="btn-row">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => setActiveStepId('DATE_SELECTION')}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextGuests}
                      className="submit-btn"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {activeStepId === 'TRAVEL_ASSISTANCE' && (
                <form onSubmit={handleNextAssistance}>
                  <h1>Travel Assistance</h1>
                  <p>Select your travel assistance</p>
                  <label htmlFor="assistanceNeeded">
                    <input
                      type="checkbox"
                      id="assistanceNeeded"
                      checked={travelAssistanceNeeded}
                      onChange={e =>
                        setTravelAssistanceNeeded(e.target.checked)
                      }
                    />
                    Travel Assistance Needed
                  </label>
                  {travelAssistanceNeeded && (
                    <select
                      value={travelAssistance}
                      onChange={e => setTravelAssistance(e.target.value)}
                    >
                      {travelAssistanceList.map(item => (
                        <option key={item.value} value={item.displayText}>
                          {item.displayText}
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="btn-row">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => setActiveStepId('GUESTS')}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextAssistance}
                      className="submit-btn"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {activeStepId === 'CONFIRMATION' && (
                <div className="confirmation-box">
                  <h1>Confirmation</h1>
                  <p>Confirm your details</p>
                  <p>Name:</p>
                  <p>{name}</p>
                  <p>Start Location:</p>
                  <p>{startLocation}</p>
                  <p>End Location:</p>
                  <p>{endLocation}</p>
                  <p>Start Date:</p>
                  <p>{startDate}</p>
                  <p>End Date:</p>
                  <p>{endDate}</p>
                  <p>Guests:</p>
                  <p>{adults + children + infants}</p>
                  <p>Travel Assistance:</p>
                  <p>{travelAssistanceNeeded ? travelAssistance : 'None'}</p>
                  <div className="btn-row">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookANewTrip