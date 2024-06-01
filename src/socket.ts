"use client";

import { createContext, useState } from "react";
import { Manager } from "socket.io-client";

// const [room, setRoom] = useState("");

const manager = new Manager("https://a32b-2a02-8070-888-b3a0-f1c4-bb9f-b45b-b2c3.ngrok-free.app/", {
  autoConnect: false,
});

export const VoiceContext = {
  SocketContext: createContext(manager.socket("/")),
  Room: createContext(""),
  Set: createContext(""),
};
