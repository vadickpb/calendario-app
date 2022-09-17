import { useState } from 'react'

import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessages} from '../../helpers/getMessages'

import NavBar from '../components/NavBar'
import CalendarEvent from '../components/CalendarEvent'
import CalendarModal from '../components/CalendarModal'
import FabAddNew from '../components/FabAddNew'

import useUiStore from '../../hooks/useUiStore'
import useCalendarStore from '../../hooks/useCalendarStore'


const CalendarPage = () => {

  const {events, activeEvent, setActiveEvent} = useCalendarStore();

  const { openDateModal } = useUiStore()
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
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
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

      <FabAddNew />
    </>
  )
}

export default CalendarPage