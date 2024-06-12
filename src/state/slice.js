import { createSlice } from '@reduxjs/toolkit'

import data from './data.json'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    value: [...data]
  },
  reducers: {
    add: (state, action) => {
      let index = state.value.findIndex((quiz) => quiz.id === action.payload.id);

      if (index === -1) {
        state.value.push(action.payload);
      } else {
        state.value[index] = action.payload;
      }
    },
    remove: (state, action) => {
      state.value = state.value.filter(x => x.id !== action.payload)
    }
  },
})

export const { add, remove } = quizSlice.actions

export default quizSlice.reducer
