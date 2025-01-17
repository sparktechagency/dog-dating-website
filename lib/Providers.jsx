"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "@/context/SocketContextApi";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* {children} */}
        <SocketProvider>{children}</SocketProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
