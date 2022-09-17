import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvennt = {
  _id: new Date().getTime(),
  title: "redux cumpleaños del jefe",
  notes: "comprar lo necesario",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgcolor: "#fafafa",
  user: {
    _id: 123,
    name: 'vadick'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvennt
    ],
    activeEvent: null
  }, 
  reducers: {
    isSaving: (state, /* action */) => {
      state.isSaving = true
    },
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload
    },
    onAddNewEvent: (state, {payload}) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent
} = calendarSlice.actions;