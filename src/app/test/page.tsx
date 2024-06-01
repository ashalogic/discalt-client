"use client";

// import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [repnumber, setRepnumber] = useState("N/A");
  repnumber;
  // useEffect(() => {
  //   if (socket.connected) {
  //     onConnect();
  //   }

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport) => {
  //       setTransport(transport.name);
  //       socket.emit("Hey");
  //     });
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("welcome", (data: string) => {
  //     //   setRepnumber(data);
  //   });
  //   socket.on("reportCount", (data: string) => {
  //     setRepnumber(data);
  //   });
  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  return (
    // <div>
    //   <p>Status: {isConnected ? "connected" : "disconnected"}</p>
    //   <p>Transport: {transport}</p>
    //   <p>number: {repnumber}</p>
    // </div>
    <div>
      <div>A</div>
      <div >
        {[...Array(5)].map((x, i) => (
          <div key={i}>
            <h1>{i}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
