import {configureStore} from '@reduxjs/toolkit'
import rememberSlice from '../slices/remember-slice'
import isAuthSlice from '../slices/isAuth-slice'
import redirectSlice from '../slices/redirect-slice'
import yearMonthSlice from '../slices/yearMonthSlice'
import dateSlice from '../slices/dateSlice'
import remindSlice from '../slices/remind-slice'
import timeFromDbSlice from '../slices/timeFromDbSlice'
import dataArraySlice from '../slices/dataArray-slice'

export const store = configureStore({
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
   reducer: {
      remember: rememberSlice,
      isAuthS: isAuthSlice,
      redirectS: redirectSlice,
      yearMonthS: yearMonthSlice,
      dateS: dateSlice,
      remindS: remindSlice,
      timeFromDbS: timeFromDbSlice,
      dataArrayS: dataArraySlice,
   }
})