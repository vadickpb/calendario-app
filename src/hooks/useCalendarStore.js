import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice"

const useCalendarStore = () => {
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector( state => state.calendar)

  const setActiveEvent = (value) => {
    dispatch(onSetActiveEvent(value))
  }
  return { 
    //* propiedades
    events,
    activeEvent,

    //* Métodos
    setActiveEvent
  }
}

export default useCalendarStore