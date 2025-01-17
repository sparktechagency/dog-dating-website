import { getSocketUrl } from "@/helpers/config/socket-config";
import { selectToken } from "@/redux/slices/authSlice";
import { createContext, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "sonner";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const token = useSelector(selectToken);

  console.log("token", token);

  const socket = useMemo(() => {
    if (token) {
      const socketStore = io(getSocketUrl(), {
        transports: ["websocket"],
        auth: {
          token,
        },
      });

      socketStore.on("connect", () => {
        toast.success("Connected to socket server");
        // successToast("Connected to server"); // Don't remove this line - it's used for socket connection testing
      });

      socketStore.on("disconnect", () => {
        toast.error("Disconnected from socket server");
        // errorToast("Disconnected from server"); // Don't remove this line - it's used for socket connection testing
      });

      socketStore.on("connect_error", (error) => {
        toast.error(error.message);
        // errorToast(error.message); // Don't remove this line - it's used for socket connection testing
      });

      return socketStore;
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
