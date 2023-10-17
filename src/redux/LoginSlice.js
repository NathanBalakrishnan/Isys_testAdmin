import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null
  },
  reducers: {
    setLoginData: (state, action) => {
      state.data = action.payload;
    }
    // Other reducer functions if needed
  }
});
export const loginConfig =(payload)=> async (dispatch)=>{
  if (payload.userName === localStorage.getItem("username") &&
  payload.passWord === localStorage.getItem("password")
  // Use navigate function to navigate
) {
  dispatch(setLoginData(payload));
  window.location.href = '/#/dashboard'
}else{
  window.alert('Username or Password is incorrect')
}   
}
export const { setLoginData } = loginSlice.actions; // Export the action
export default loginSlice.reducer; // Export the reducer
