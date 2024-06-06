"use client";

import ChatP2PContextProvider from "./ChatP2PContextProvider";

export default function ChatP2PLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatP2PContextProvider>
      <main
        className="h-dvh bg-neutral-200 p-4 bg-no-repeat bg-right-bottom bg-[length:400px_300px]"
        style={{ backgroundImage: `url('/backgrounds/1.svg')` }}
      >
        {children}
      </main>
    </ChatP2PContextProvider>
  );
}
