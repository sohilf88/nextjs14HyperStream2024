"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";

function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    {children}
    </PersistGate>
    </Provider>;
}

export default Providers;
