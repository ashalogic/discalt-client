"use client";

import { createContext,useState } from "react";
import { Manager } from "socket.io-client";

// const [room, setRoom] = useState("");

const manager = new Manager("https://squid-app-alc8r.ondigitalocean.app/", {
  autoConnect: false,
});

export const VoiceContext = {
  SocketContext: createContext(manager.socket("/")),
  Room: createContext(""),
  Set: createContext(""),
};
