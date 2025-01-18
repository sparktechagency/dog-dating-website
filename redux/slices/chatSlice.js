import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUser: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUser = action.payload; // Replace the array with the new online users
    },
  },
});

export const { setOnlineUsers } = chatSlice.actions;

export default chatSlice.reducer; // Use `.reducer` for export
