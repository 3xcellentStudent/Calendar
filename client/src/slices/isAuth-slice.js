import {createSlice} from '@reduxjs/toolkit'

const isAuthSlice = createSlice({
   name: 'isAuth',
   initialState: {
      isAuth: false
   },
   reducers: {
      setAuth(state, action){state.isAuth = action.payload}
   }
})

export const {setAuth} = isAuthSlice.actions
export default isAuthSlice.reducer