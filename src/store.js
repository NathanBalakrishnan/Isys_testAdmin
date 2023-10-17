// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
// import { setLoginData } from './redux/LoginSlice'; // Import the named action
import {loginUser} from './api/apiConfig';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // loginUser: setLoginData,
    loginData: loginUser
     // Use the imported action
    // You can add more reducers here if needed
  }
});

export default store;