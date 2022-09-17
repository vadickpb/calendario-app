import useCalendarStore from "../../hooks/useCalendarStore"

const FabDeleteEvent = () => {

  const { startDeletingEvent, existActiveEvent } = useCalendarStore()

  const handleDeleteEvent = async() => {
    await startDeletingEvent();
  }

  return (
    <button
      className="btn btn-danger fab-delete"
      onClick={handleDeleteEvent}
      style = {{ display: existActiveEvent ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}

export default FabDeleteEvent