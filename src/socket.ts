"use client";

import { createContext, useState } from "react";
import { Manager } from "socket.io-client";

// const [room, setRoom] = useState("");

const manager = new Manager("https://bit.ly/discaltserver", {
  autoConnect: false,
});

export const VoiceContext = {
  SocketContext: createContext(manager.socket("/")),
  Room: createContext(""),
  Set: createContext(""),
};
