"use client";

import Image from "next/image";
import VoicBox from "./sections/voiceBox";
import ChatBox from "./sections/chatBox";
import Navbar from "./components/navbar";
import RoomBox from "./sections/roomBox";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import Link from "next/link";

export default function Index() {
  return (
    <main className="h-dvh bg-neutral-200 p-4">
      <div className="inline-flex flex-col bg-white/70 shadow-md p-4">
        <h1>Welcome to AshaLand</h1>
        <Link href="/chat" className="hover:shadow p-2 px-4">
          Chat IO Server
        </Link>
        <Link href="/chatp2p" className="hover:shadow p-2 px-4">
          Chat P2P
        </Link>
        <Link href="/ml" className="hover:shadow p-2 px-4">
          ML
        </Link>
      </div>
    </main>
  );
}
