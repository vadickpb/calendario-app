import { addHours } from "date-fns";
import useCalendarStore from "../../hooks/useCalendarStore";
import useUiStore from "../../hooks/useUiStore"

const FabAddNew = () => {

  const { openDateModal} = useUiStore();
  const { setActiveEvent } = useCalendarStore()

  const handleNewClick = () => {
    openDateModal()

    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgcolor: "#fafafa",
      user: {
        _id: 123,
        name: 'vadick'
      }
    })
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleNewClick}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}

export default FabAddNew