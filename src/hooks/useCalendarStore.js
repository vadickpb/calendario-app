import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../apis/calendarApi"
import { convertStringToDateEvents } from "../helpers/convertStringToDateEvents"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"

const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //actualizad
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //creando
      const { data } = await calendarApi.post('/events', calendarEvent)
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }

  }

  const startDeletingEvent = async () => {
    //todo: Llegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
      Swal.fire('Evento Eliminado', 'El evento se eliminó correctamente', 'success')
      
    } catch (error) {
      console.log(error); 
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertStringToDateEvents(data.eventos)
      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log('error cargando eventos');
      console.log(error);
    }
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
    startLoadingEvents,
  }
}

export default useCalendarStore