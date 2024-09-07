// src/features/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: number;
  name: string;
  surname: string;
  gender: string;
  phone: string;
  nationality: string;
  dob: string;
  salary: string;
}

interface FormState {
  people: Person[];
}

const initialState: FormState = {
  people: JSON.parse(localStorage.getItem('people') || '[]'),
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
      localStorage.setItem('people', JSON.stringify(state.people));
    },
    editPerson: (state, action: PayloadAction<Person>) => {
      const index = state.people.findIndex((person) => person.id === action.payload.id);
      if (index !== -1) {
        state.people[index] = action.payload;
        localStorage.setItem('people', JSON.stringify(state.people));
      }
    },
    deletePerson: (state, action: PayloadAction<number>) => {
      state.people = state.people.filter((person) => person.id !== action.payload);
      localStorage.setItem('people', JSON.stringify(state.people));
    },
  },
});

export const { addPerson, editPerson, deletePerson } = formSlice.actions;
export default formSlice.reducer;
