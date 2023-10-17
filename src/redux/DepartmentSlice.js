import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    data: null
  },
  reducers: {
    setDepartmentData: (state, action) => {
      state.data = action.payload;
    }
    // Other reducer functions if needed
  }
});
export const deparmentConfig =(payload)=> async (dispatch)=>{
   console.log("Payload value are",payload)
}
export const { setDepartmentData } = departmentSlice.actions; // Export the action
export default departmentSlice.reducer; // Export the reducer
