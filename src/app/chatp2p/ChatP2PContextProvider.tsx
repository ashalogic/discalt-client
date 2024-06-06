import { useState, createContext } from "react";
import P2P from "@/p2p";

export const PC = new P2P();

export const AppContext = createContext({});

const ChatP2PContextProvider = ({ children }: any) => {
  const [appState, setAppState] = useState("action-select");
  const [toastState, setToastState] = useState({
    show: false,
    severity: "info",
    message: undefined,
    key: undefined,
  });

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        toastState,
        setToastState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ChatP2PContextProvider;
