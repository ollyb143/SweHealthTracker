import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: { token: null },
  reducers: {
    setToken: (s, a) => { s.token = a.payload; },
    logoutUser: s => { s.token = null; },
  },
});
export const { setToken, logoutUser } = slice.actions;
export default slice.reducer;
