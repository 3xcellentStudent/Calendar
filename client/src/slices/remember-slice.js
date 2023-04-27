import {createSlice} from '@reduxjs/toolkit'

const rememberSlice = createSlice({
   name: 'inputs',
   initialState: {
      email: null,
      password: null,
   },
   reducers: {
      rememberEmail(state, action){
         state.email = action.payload
      },
      rememberPassword(state, action){
         state.password = action.payload
      },
   }
})

export const {rememberEmail, rememberPassword} = rememberSlice.actions
export default rememberSlice.reducer