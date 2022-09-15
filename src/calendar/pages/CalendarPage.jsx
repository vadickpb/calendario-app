import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours} from 'date-fns'

import NavBar from '../components/NavBar'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessages} from '../../helpers/getMessages'



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

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({event, start, end, isSelected})

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

  return (
    <>
      <NavBar />

      <Calendar
      culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages = {getMessages()}
        eventPropGetter= {eventStyleGetter}
      />
    </>
  )
}

export default CalendarPage