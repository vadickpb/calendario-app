import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice"

const useCalendarStore = () => {
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector( state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async(calendarEvent) => {
    // todo: llegar al backend

    //todo bien
    if(calendarEvent._id){
      //actualizad
    } else {
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }
  return { 
    //* propiedades
    events,
    activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
  }
}

export default useCalendarStore