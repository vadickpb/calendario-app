import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns';
import { addHours } from 'date-fns/esm';
import useUiStore from '../../hooks/useUiStore';
import useCalendarStore from '../../hooks/useCalendarStore';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const CalendarModal = () => {

  const{isDateModalOpen, closeDateModal} = useUiStore()
  const {activeEvent} = useCalendarStore()

  const [formSubmited, setFormSubmited] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2)
  });
  
  const titleClass = useMemo(() =>{
    if(!formSubmited) return '';
    return (formValues.title <= 0)
    ? 'is-invalid'
    : ''
  }, [formValues.title, formSubmited])
  
  useEffect(() => {
    if (activeEvent !== null){
      setFormValues({...activeEvent})
    }
  }, [activeEvent])

  const onInputChange = ({target}) => {
    const {name, value } = target
      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const onDateChange = (event, changing) => {
    console.log(event);
    setFormValues({
      ...formValues,
      [changing] : event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    setFormSubmited(true)
    const difference = differenceInSeconds(formValues.end, formValues.start)
    if (isNaN(difference) || difference <= 0){
      Swal.fire('Fechas incorrectas', 'revisar las fechas ingresadas', 'error')
      console.log('error en fechas');
      return;
    }
    if (formValues.title = '') return;
  }

  


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmitForm}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
          <DatePicker
            className="form-control" 
            placeholder="Fecha inicio"
            selected={formValues.start}
            onChange = {(event) => onDateChange(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            className='form-control'
            placeholder = 'Fecha de fin'
            selected={formValues.end}
            onchange = {(event) => onDateChange(event, 'end')}
            dateFormat="Pp"
            minDate={formValues.start}
            showTimeSelect
            locale="es"
            timeCaption='Hora'

          />

        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange = {onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange = {onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>

    </Modal>
  )
}

export default CalendarModal