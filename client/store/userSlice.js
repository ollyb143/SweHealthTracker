import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null, // Initialise from localStorage
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;
