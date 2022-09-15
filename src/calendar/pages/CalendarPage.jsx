import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours} from 'date-fns'

import NavBar from '../components/NavBar'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessages} from '../../helpers/getMessages'
import CalendarEvent from '../components/CalendarEvent'
import { useState } from 'react'
import CalendarModal from '../components/CalendarModal'



const events = [{
  title: "cumpleaños del jefe",
  notes: "comprar lo necesario",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgcolor: "#fafafa",
  user: {
    _id: 123,
    name: 'vadick'
  }
}]

const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')  

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDobleClickEvent = (event) => {
    console.log({'dobleClick': event});
  }

  const onSelect = (event) => {
    console.log({'selected': event});
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        defaultView= {lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages = {getMessages()}
        eventPropGetter= {eventStyleGetter}
        components = {{
          event: CalendarEvent
          }}
        onDoubleClickEvent= {onDobleClickEvent}
        onSelectEvent= {onSelect}
        onView={onViewChange}
      />

      <CalendarModal />
    </>
  )
}

export default CalendarPage