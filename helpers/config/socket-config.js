// import { io } from "socket.io-client";

// const socket = io(
//   process.env.NEXT_PUBLIC_BACKEND_URL || "http://10.0.70.112:8001",
//   {
//     transports: ["websocket"], // Ensure WebSocket transport is used
//     reconnection: true, // Enable reconnection if disconnected
//   }
// );

// export default socket;

export const getSocketUrl = () => {
  return process.env.NEXT_PUBLIC_SOCKET_API;
};
