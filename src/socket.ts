"use client";

import { createContext,useState } from "react";
import { Manager } from "socket.io-client";

// const [room, setRoom] = useState("");

const manager = new Manager("http://localhost:3000/", {
  autoConnect: false,
});

export const VoiceContext = {
  SocketContext: createContext(manager.socket("/")),
  Room: createContext(""),
  Set: createContext(""),
};
