import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"

const useCalendarStore = () => {
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector( state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async(calendarEvent) => {
    // todo: llegar al backend

    if(calendarEvent._id){
      //actualizad
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }

  const startDeletingEvent = async() => {
    //todo: Llegar al backend

    dispatch(onDeleteEvent())
  }

  return { 
    //* propiedades
    events,
    activeEvent,
    existActiveEvent: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}

export default useCalendarStore