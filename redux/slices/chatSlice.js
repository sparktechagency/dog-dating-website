import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    typingUser: null,
    onlineUser: [],
  },
  reducers: {
    setTypingUser: (state, action) => {
      state.typingUser = action.payload; // Replace the array with the new online users
    },
    setOnlineUsers: (state, action) => {
      state.onlineUser = action.payload; // Replace the array with the new online users
    },
  },
});

export const { setOnlineUsers, setTypingUser } = chatSlice.actions;
export const selectTypingUsers = (state) => state.chat.typingUser;

export default chatSlice.reducer; // Use `.reducer` for export
