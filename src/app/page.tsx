"use client";

import Image from "next/image";
import VoicBox from "./sections/voiceBox";
import ChatBox from "./sections/chatBox";
import Navbar from "./components/navbar";
import RoomBox from "./sections/roomBox";

export default function Home() {
  return (
    <main className="h-dvh bg-neutral-200">
      <div
        className="h-full bg-no-repeat items-center p-12"
        style={{
          backgroundImage: `url('https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg')`,
          backgroundPosition: "-250px -200px",
        }}
      >
        <div
          className="w-full h-full flex flex-col bg-white/30 backdrop-blur-lg rounded-lg shadow-lg"
          style={
            {
              // boxShadow: "0 2px 10px 2px rgba(0, 0, 0, 0.1)",
            }
          }
        >
          <Navbar />
          <div className="flex-grow flex flex-row overflow-hidden">
            <RoomBox />
            <VoicBox />
            <ChatBox />
          </div>
        </div>
      </div>
    </main>
  );
}
